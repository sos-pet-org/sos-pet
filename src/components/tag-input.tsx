import { forwardRef, useState } from "react";
import { Badge } from "./ui/badge";
import { Input, type InputProps } from "./ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export type TagInputProps = Omit<InputProps, "value" | "onChange"> & {
  value: string[];
  onChange: (tags: string[]) => void;
};

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, ...props }: TagInputProps, ref) => {
    const [newTag, setNewTag] = useState("");

    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant="secondary"
              className="flex h-min items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
              onClick={() => onChange(value.filter((t) => t !== tag))}
            >
              <span>{tag}</span>
              <Cross2Icon />
            </Button>
          ))}
        </div>
        <Input
          {...props}
          ref={ref}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (!newTag) return;
              onChange([...new Set([...value, newTag])]);
              setNewTag("");
            }
          }}
        />
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
