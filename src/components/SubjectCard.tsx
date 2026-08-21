"use client";

import {
    Calendar,
    ChevronRight,
    Trash2,
    CheckCircle2,
} from "lucide-react";

import { Subject } from "@/types/exam";
import {
    getSubjectProgress,
    isSubjectCompleted,
} from "@/utils/progress";
import { formatDate } from "@/utils/date";
import ProgressBar from "./ProgressBar";

interface SubjectCardProps {
    subject: Subject;
    onOpen: () => void;
    onDelete: () => void;
}

export default function SubjectCard({
    subject,
    onOpen,
    onDelete,
}: SubjectCardProps) {
    const progress =
        getSubjectProgress(subject);

    const completed =
        isSubjectCompleted(subject);

    const completedTopics =
        subject.topics.filter(
            (topic) => topic.completed
        ).length;

    return (
        <div
            className={`group rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${completed
                    ? "border-emerald-200 bg-linear-to-br from-white to-emerald-50"
                    : "border-violet-100 bg-linear-to-br from-white to-violet-50"
                }`}
        >
            <button
                onClick={onOpen}
                className="w-full text-left"
            >
                <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${completed
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-violet-100 text-violet-600"
                                }`}
                        >
                            {completed ? (
                                <CheckCircle2 size={21} />
                            ) : (
                                <span className="text-sm font-bold">
                                    {completedTopics}
                                </span>
                            )}
                        </div>

                        <div>
                            <h2 className="font-bold text-slate-900">
                                {subject.name}
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-400">
                                {completedTopics} /{" "}
                                {subject.topics.length} topics
                            </p>
                        </div>
                    </div>

                    {completed ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            Completed ✓
                        </span>
                    ) : (
                        <ChevronRight
                            size={19}
                            className="text-slate-300"
                        />
                    )}
                </div>

                {subject.deadline && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-600">
                        <Calendar size={14} />

                        Deadline: {formatDate(subject.deadline)}
                    </div>
                )}

                <div className="mt-5">
                    <ProgressBar progress={progress} />
                </div>
            </button>

            <button
                onClick={onDelete}
                aria-label="Delete subject"
                className="mt-4 rounded-xl p-2 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}