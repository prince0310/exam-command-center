"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useExamStore } from "@/hooks/useExamStore";
import SubjectCard from "@/components/SubjectCard";
import AddSubjectModal from "@/components/AddSubjectModal";

export default function ExamPage() {
    const router = useRouter();
    const params = useParams();

    const examId = params.id as string;

    const exam = useExamStore((state) =>
        state.exams.find(
            (exam) => exam.id === examId
        )
    );

    const loadExams = useExamStore(
        (state) => state.loadExams
    );

    useEffect(() => {
        loadExams();
    }, [loadExams]);

    const deleteSubject = useExamStore(
        (state) => state.deleteSubject
    );

    const [showModal, setShowModal] =
        useState(false);

    if (!exam) {
        return (
            <main className="p-10">
                Exam not found.
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100 text-slate-900">
            <div className="mx-auto max-w-6xl px-6 py-10">

                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => router.push("/")}
                            className="rounded-xl bg-white p-3 shadow-sm"
                        >
                            <ArrowLeft size={19} />
                        </button>

                        <div>
                            <h1 className="text-3xl font-bold">
                                {exam.name}
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Subjects
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
                    >
                        <Plus size={18} />
                        Add Subject
                    </button>
                </div>

                {exam.subjects.length === 0 ? (
                    <div className="rounded-2xl border border-dashed bg-white p-16 text-center">
                        <h2 className="font-semibold">
                            No subjects yet
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Add your first subject.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {exam.subjects.map((subject) => (
                            <SubjectCard
                                key={subject.id}
                                subject={subject}
                                onOpen={() =>
                                    router.push(
                                        `/subject/${subject.id}?examId=${exam.id}`
                                    )
                                }
                                onDelete={() =>
                                    deleteSubject(
                                        exam.id,
                                        subject.id
                                    )
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <AddSubjectModal
                    examId={exam.id}
                    onClose={() =>
                        setShowModal(false)
                    }
                />
            )}
        </main>
    );
}