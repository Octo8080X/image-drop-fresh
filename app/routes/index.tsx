import { Head } from "$fresh/runtime.ts";
import Uploader from "../islands/Uploader.tsx";
import Images from "../islands/Images.tsx";

export default function Home() {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <Uploader />
      <Images />
    </div>
  );
}
