"use client";

import { X, FileText, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useExamStore } from "@/hooks/useExamStore";

interface Props {
    examId: string;
    subjectId: string;
    onClose: () => void;
}

export default function AddTopicModal({
    examId,
    subjectId,
    onClose,
}: Props) {
    const addTopic = useExamStore(
        (state) => state.addTopic
    );

    const [name, setName] = useState("");
    const [description, setDescription] =
        useState("");
    const [deadline, setDeadline] =
        useState("");

    function handleSubmit() {
        if (!name.trim()) return;

        addTopic(
            examId,
            subjectId,
            name,
            description,
            deadline || undefined
        );

        setName("");
        setDescription("");
        setDeadline("");

        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="border-b bg-linear-to-r from-violet-50 to-indigo-50 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Add Topic
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Define exactly what you need to complete.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-xl p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Form */}

                <div className="space-y-5 p-6">

                    {/* Name */}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Topic Name
                        </label>

                        <input
                            autoFocus
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="e.g. Fundamental Rights"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    {/* Description */}

                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <FileText size={16} />
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="What exactly do you need to cover? Add notes, important points, sources, PYQs, etc."
                            rows={5}
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />

                        <p className="mt-1 text-xs text-slate-400">
                            Optional — you can add notes about the topic.
                        </p>
                    </div>

                    {/* Deadline */}

                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <CalendarDays size={16} />
                            Deadline
                        </label>

                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) =>
                                setDeadline(e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    {/* Button */}

                    <button
                        onClick={handleSubmit}
                        className="w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl"
                    >
                        Add Topic
                    </button>
                </div>
            </div>
        </div>
    );
}