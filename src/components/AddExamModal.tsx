"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useExamStore } from "@/hooks/useExamStore";

interface Props {
    onClose: () => void;
}

export default function AddExamModal({
    onClose,
}: Props) {
    const addExam = useExamStore(
        (state) => state.addExam
    );

    const [name, setName] = useState("");

    function handleSubmit() {
        if (!name.trim()) return;

        addExam(name);

        setName("");
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        Add Exam
                    </h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <input
                    autoFocus
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit();
                        }
                    }}
                    placeholder="e.g. UPSC CSE"
                    className="w-full rounded-xl border px-4 py-3 outline-none"
                />

                <button
                    onClick={handleSubmit}
                    className="mt-5 w-full rounded-xl bg-slate-900 py-3 font-semibold text-white"
                >
                    Add Exam
                </button>
            </div>
        </div>
    );
}