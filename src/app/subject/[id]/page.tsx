"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useExamStore } from "@/hooks/useExamStore";
import TopicCard from "@/components/TopicCard";
import AddTopicModal from "@/components/AddTopicModal";
import ProgressBar from "@/components/ProgressBar";

import {
    getSubjectProgress,
    isSubjectCompleted,
} from "@/utils/progress";

export default function SubjectPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const subjectId = params.id as string;
    const examId = searchParams.get("examId");

    const exam = useExamStore((state) =>
        state.exams.find(
            (exam) => exam.id === examId
        )
    );

    const toggleTopic = useExamStore(
        (state) => state.toggleTopic
    );

    const deleteTopic = useExamStore(
        (state) => state.deleteTopic
    );

    const [showModal, setShowModal] =
        useState(false);

    const subject = exam?.subjects.find(
        (subject) =>
            subject.id === subjectId
    );

    if (!exam || !subject) {
        return (
            <main className="p-10">
                Subject not found.
            </main>
        );
    }

    const progress =
        getSubjectProgress(subject);

    const completed =
        isSubjectCompleted(subject);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100 text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-10">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">

                        <button
                            onClick={() =>
                                router.push(
                                    `/exam/${exam.id}`
                                )
                            }
                            className="rounded-xl bg-white p-3 shadow-sm"
                        >
                            <ArrowLeft size={19} />
                        </button>

                        <div>
                            <p className="text-sm text-slate-400">
                                {exam.name}
                            </p>

                            <h1 className="text-3xl font-bold">
                                {subject.name}
                            </h1>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
                    >
                        <Plus size={18} />
                        Add Topic
                    </button>
                </div>

                {/* Progress */}

                <div
                    className={`mb-8 rounded-2xl border p-6 ${completed
                            ? "border-green-200 bg-green-50"
                            : "bg-white"
                        }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Subject Progress
                            </p>

                            <p className="mt-1 text-3xl font-bold">
                                {progress}%
                            </p>
                        </div>

                        {completed && (
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-600">
                                    Subject Completed ✓
                                </p>

                                <p className="text-sm text-green-600">
                                    Great work!
                                </p>
                            </div>
                        )}
                    </div>

                    <ProgressBar
                        progress={progress}
                    />
                </div>

                {/* Topics */}

                {subject.topics.length === 0 ? (
                    <div className="rounded-2xl border border-dashed bg-white p-16 text-center">
                        <h2 className="font-semibold">
                            No topics yet
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Add topics to start tracking.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {subject.topics.map((topic) => (
                            <TopicCard
                                key={topic.id}
                                topic={topic}
                                onToggle={() =>
                                    toggleTopic(
                                        exam.id,
                                        subject.id,
                                        topic.id
                                    )
                                }
                                onDelete={() =>
                                    deleteTopic(
                                        exam.id,
                                        subject.id,
                                        topic.id
                                    )
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <AddTopicModal
                    examId={exam.id}
                    subjectId={subject.id}
                    onClose={() =>
                        setShowModal(false)
                    }
                />
            )}
        </main>
    );
}