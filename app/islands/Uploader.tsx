import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { mode } from "../util/signal.ts";
import { SimpleDropzone } from "simple-dropzone";
import UploaderIcon from "../components/UpLoadIcon.tsx";

export default function Uploader(_props: JSX.HTMLAttributes) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const upload = async (file: File) => {
    if (!inputRef.current) return;

    const result = await fetch("/api/get_temp_post_url");
    const resultJson = await result.json();
    const formData = new FormData();
    formData.append("file", file);

    const uploadResult = await fetch(resultJson.url, {
      method: "POST",
      body: formData,
    });

    const uploadedResultJson = await uploadResult.json();

    await fetch("/api/image_updated", {
      method: "POST",
      body: JSON.stringify(uploadedResultJson),
    });

    inputRef.current.value = "";

    mode.value = 1;
  };

  useEffect(() => {
    const dropCtrl = new SimpleDropzone(dropzoneRef.current, inputRef.current);
    dropCtrl.on("drop", ({ files }: { files: Map<number, File> }) => {
      for (const [_key, value] of files) {
        upload(value);
      }
    });
  }, []);

  return (
    <div class="container">
      <div id="dropzone" ref={dropzoneRef}>
        <label class="flex justify-center w-full h-32 px-4 transition bg-white border-4 border-gray-300 border-dashed rounded-lg hover:border-gray-600">
          <div class="flex flex-col items-center m-2">
            <div>
              <UploaderIcon />
            </div>
            <div>
              <span class="font-medium text-gray-600">
                Drop or Select
              </span>
            </div>
          </div>
          <input type="file" ref={inputRef} class="hidden" multiple />
        </label>
      </div>
    </div>
  );
}
