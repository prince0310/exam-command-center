"use client";

import { useEffect, useState } from "react";
import {
    Plus,
    Target,
    Calendar,
    CheckCircle2,
    Clock3,
    ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useExamStore } from "@/hooks/useExamStore";
import ExamCard from "@/components/ExamCard";
import AddExamModal from "@/components/AddExamModal";
import { formatDate } from "@/utils/date";

export default function Home() {
    const router = useRouter();

    const exams = useExamStore(
        (state) => state.exams
    );

    const deleteExam = useExamStore(
        (state) => state.deleteExam
    );

    const toggleTopic = useExamStore(
        (state) => state.toggleTopic
    );
    const loadExams = useExamStore(
  (state) => state.loadExams
);

useEffect(() => {
  loadExams();
}, [loadExams]);

    const [showModal, setShowModal] =
        useState(false);

    /*
     * Today's targets
     *
     * We take the first incomplete topic
     * from every subject.
     *
     * There is NO separate target state.
     * Completing the topic anywhere automatically
     * removes it from Today's Targets.
     */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todaysTargets = exams.flatMap((exam) =>
        exam.subjects.flatMap((subject) =>
            subject.topics
                .filter((topic) => {
                    if (topic.completed) return false;
                    if (!topic.deadline) return false;

                    const deadline = new Date(topic.deadline);
                    deadline.setHours(0, 0, 0, 0);

                    return deadline <= today;
                })
                .map((topic) => ({
                    examId: exam.id,
                    examName: exam.name,

                    subjectId: subject.id,
                    subjectName: subject.name,

                    topic,
                }))
        )
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100 text-slate-900">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* =========================
            HEADER
        ========================= */}

                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div>
                        <p className="mb-2 text-sm font-semibold text-indigo-600">
                            EXAM COMMAND CENTER
                        </p>

                        <h1 className="text-4xl font-black tracking-tight text-slate-900">
                            Your Preparation
                        </h1>

                        <p className="mt-2 text-sm text-slate-600">
                            One small step at a time.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        <Plus size={18} />
                        Add Exam
                    </button>
                </div>

                {/* =========================
            TODAY'S TARGETS
        ========================= */}

                <section className="mb-12">

                    <div className="mb-5 flex items-end justify-between">

                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                    <Target size={20} />
                                </div>

                                <h2 className="text-2xl font-bold">
                                    Today&apos;s Targets
                                </h2>
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                                Your next incomplete topic from each subject.
                            </p>
                        </div>

                        <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
                            {todaysTargets.length} remaining
                        </span>
                    </div>

                    {todaysTargets.length === 0 ? (
                        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-10 text-center shadow-sm">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                <CheckCircle2 size={28} />
                            </div>

                            <h3 className="mt-4 text-xl font-bold text-emerald-800">
                                Everything is complete! 🎉
                            </h3>

                            <p className="mt-1 text-sm text-emerald-600">
                                No incomplete topics in your current subjects.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                            {todaysTargets.map((target) => (
                                <div
                                    key={`${target.examId}-${target.subjectId}-${target.topic.id}`}
                                    className="group rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    {/* Exam */}

                                    <div className="flex items-center justify-between">

                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                                            {target.examName}
                                        </span>

                                        <Clock3
                                            size={17}
                                            className="text-amber-500"
                                        />
                                    </div>

                                    {/* Subject */}

                                    <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-violet-500">
                                        {target.subjectName}
                                    </p>

                                    {/* Topic */}

                                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                                        {target.topic.name}
                                    </h3>

                                    {/* Description */}

                                    {target.topic.description && (
                                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                                            {target.topic.description}
                                        </p>
                                    )}

                                    {/* Deadline */}

                                    {target.topic.deadline && (
                                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-600">
                                            <Calendar size={14} />

                                            Deadline:{" "}
                                            {formatDate(
                                                target.topic.deadline
                                            )}
                                        </div>
                                    )}

                                    {/* Actions */}

                                    <div className="mt-5 flex gap-2">

                                        <button
                                            onClick={() =>
                                                toggleTopic(
                                                    target.examId,
                                                    target.subjectId,
                                                    target.topic.id
                                                )
                                            }
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 text-sm font-bold text-white shadow-md shadow-emerald-100 transition hover:from-emerald-600 hover:to-green-600"
                                        >
                                            <CheckCircle2 size={17} />
                                            Complete
                                        </button>

                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/subject/${target.subjectId}?examId=${target.examId}`
                                                )
                                            }
                                            className="flex items-center justify-center rounded-xl bg-slate-100 px-4 text-slate-600 transition hover:bg-slate-200"
                                        >
                                            <ArrowRight size={18} />
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* =========================
            EXAMS
        ========================= */}

                <section>

                    <div className="mb-5">
                        <h2 className="text-2xl font-bold">
                            Your Exams
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Track your complete preparation journey.
                        </p>
                    </div>

                    {exams.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-indigo-200 bg-white/80 p-16 text-center shadow-sm">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                                <Target size={28} />
                            </div>

                            <h3 className="mt-4 font-bold text-slate-900">
                                No exams added
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Add your first exam to start building your preparation system.
                            </p>

                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
                            >
                                Add Your First Exam
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {exams.map((exam) => (
                                <ExamCard
                                    key={exam.id}
                                    exam={exam}
                                    onOpen={() =>
                                        router.push(
                                            `/exam/${exam.id}`
                                        )
                                    }
                                    onDelete={() =>
                                        deleteExam(exam.id)
                                    }
                                />
                            ))}

                        </div>
                    )}
                </section>
            </div>

            {/* Add Exam Modal */}

            {showModal && (
                <AddExamModal
                    onClose={() =>
                        setShowModal(false)
                    }
                />
            )}
        </main>
    );
}