"use client";

import { Check, CopyIcon } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ url }: { url: string | null }) {
    const [copied, setCopied] = useState<boolean>(false);
    const onCopy = async () => {
        if (!url) return;

        try {
            //Copy the link into clipboard
            await navigator.clipboard.writeText(url);
            setCopied(true);

            //Set the copied boolean back to false in 2 second
            setTimeout(() => setCopied(false), 2000);
        } catch (err: any) {
            throw new Error("an error occurred", err);
        }
    };

    return (
        <button onClick={onCopy} className="text-sm">
            {copied ? (
                <div className="flex gap-2">
                    <Check size={18} />
                    <p>Copied!!</p>
                </div>
            ) : (
                <div className="flex gap-2">
                    <CopyIcon size={18} />
                    <p>Copy</p>
                </div>
            )}
        </button>
    );
}
