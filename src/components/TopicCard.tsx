"use client";

import {
    Calendar,
    Check,
    Trash2,
    FileText,
} from "lucide-react";

import { Topic } from "@/types/exam";
import { formatDate } from "@/utils/date";

interface TopicCardProps {
    topic: Topic;
    onToggle: () => void;
    onDelete: () => void;
}

export default function TopicCard({
    topic,
    onToggle,
    onDelete,
}: TopicCardProps) {
    return (
        <div
            className={`group rounded-2xl border p-5 transition-all duration-200 ${topic.completed
                    ? "border-emerald-200 bg-linear-to-r from-emerald-50 to-green-50 shadow-sm"
                    : "border-sky-100 bg-linear-to-r from-white to-sky-50 shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                }`}
        >
            <div className="flex items-start justify-between gap-4">

                {/* Left */}

                <div className="flex min-w-0 gap-4">

                    {/* Checkbox */}

                    <button
                        onClick={onToggle}
                        aria-label={
                            topic.completed
                                ? "Mark incomplete"
                                : "Mark complete"
                        }
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-200 ${topic.completed
                                ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-200"
                                : "border-slate-300 bg-white text-transparent hover:border-violet-400 hover:bg-violet-50"
                            }`}
                    >
                        {topic.completed && (
                            <Check size={18} strokeWidth={3} />
                        )}
                    </button>

                    {/* Content */}

                    <div className="min-w-0">

                        <h3
                            className={`font-semibold ${topic.completed
                                    ? "text-emerald-700 line-through"
                                    : "text-slate-900"
                                }`}
                        >
                            {topic.name}
                        </h3>

                        {/* Description */}

                        {topic.description && (
                            <div
                                className={`mt-2 flex gap-2 text-sm leading-6 ${topic.completed
                                        ? "text-emerald-600/70"
                                        : "text-slate-500"
                                    }`}
                            >
                                <FileText
                                    size={15}
                                    className="mt-1 shrink-0"
                                />

                                <p>
                                    {topic.description}
                                </p>
                            </div>
                        )}

                        {/* Deadline */}

                        {topic.deadline && (
                            <div
                                className={`mt-3 flex items-center gap-2 text-xs font-medium ${topic.completed
                                        ? "text-emerald-600"
                                        : "text-amber-600"
                                    }`}
                            >
                                <Calendar size={14} />

                                <span>
                                    Deadline:{" "}
                                    {formatDate(topic.deadline)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Delete */}

                <button
                    onClick={onDelete}
                    aria-label="Delete topic"
                    className="shrink-0 rounded-xl p-2 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
                >
                    <Trash2 size={17} />
                </button>
            </div>

            {/* Completed message */}

            {topic.completed && (
                <div className="mt-4 ml-12 text-xs font-semibold text-emerald-600">
                    ✓ Completed
                </div>
            )}
        </div>
    );
}