import { AlertCircle } from "lucide-react";

export default function ErrorMassage() {
    return (
        <p className="text-red-400 text-xs flex gap-2">
            <AlertCircle size={14} />
            <span>This is field required</span>
        </p>
    );
}
