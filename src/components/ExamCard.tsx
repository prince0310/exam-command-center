"use client";

import {
    CheckCircle2,
    ChevronRight,
    Trash2,
    BookOpen,
} from "lucide-react";

import { Exam } from "@/types/exam";
import {
    getExamProgress,
    isExamCompleted,
} from "@/utils/progress";

import ProgressBar from "./ProgressBar";

interface ExamCardProps {
    exam: Exam;
    onOpen: () => void;
    onDelete: () => void;
}

export default function ExamCard({
    exam,
    onOpen,
    onDelete,
}: ExamCardProps) {
    const progress =
        getExamProgress(exam);

    const completed =
        isExamCompleted(exam);

    const completedSubjects =
        exam.subjects.filter(
            (subject) =>
                subject.topics.length > 0 &&
                subject.topics.every(
                    (topic) => topic.completed
                )
        ).length;

    return (
        <div
            className={`group rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${completed
                    ? "border-emerald-200 bg-linear-to-br from-white to-emerald-50"
                    : "border-indigo-100 bg-linear-to-br from-white via-white to-indigo-50"
                }`}
        >
            <button
                onClick={onOpen}
                className="w-full text-left"
            >
                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${completed
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-indigo-100 text-indigo-600"
                                }`}
                        >
                            {completed ? (
                                <CheckCircle2 size={23} />
                            ) : (
                                <BookOpen size={21} />
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                {exam.name}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                {exam.subjects.length} subjects
                            </p>
                        </div>
                    </div>

                    <ChevronRight
                        size={20}
                        className="text-slate-300"
                    />
                </div>

                {completed && (
                    <div className="mt-4 rounded-xl bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-700">
                        🎉 Exam Completed
                    </div>
                )}

                <div className="mt-6">
                    <ProgressBar progress={progress} />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                    {completedSubjects} /{" "}
                    {exam.subjects.length} subjects completed
                </p>
            </button>

            <button
                onClick={onDelete}
                aria-label="Delete exam"
                className="mt-4 rounded-xl p-2 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}