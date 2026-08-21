"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useExamStore } from "@/hooks/useExamStore";

interface Props {
    examId: string;
    onClose: () => void;
}

export default function AddSubjectModal({
    examId,
    onClose,
}: Props) {
    const addSubject = useExamStore(
        (state) => state.addSubject
    );

    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit() {
        if (!name.trim()) return;

        addSubject(
            examId,
            name,
            deadline || undefined
        );

        setName("");
        setDeadline("");
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        Add Subject
                    </h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <label className="mb-2 block text-sm font-medium">
                    Subject Name
                </label>

                <input
                    autoFocus
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="e.g. Polity"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                />

                <label className="mb-2 mt-5 block text-sm font-medium">
                    Deadline
                </label>

                <input
                    type="date"
                    value={deadline}
                    onChange={(e) =>
                        setDeadline(e.target.value)
                    }
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                />

                <button
                    onClick={handleSubmit}
                    className="mt-5 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white"
                >
                    Add Subject
                </button>
            </div>
        </div>
    );
}