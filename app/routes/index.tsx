import { Head } from "$fresh/runtime.ts";
import Uploader from "../islands/Uploader.tsx";
import Images from "../islands/Images.tsx";

export default function Home() {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <Head>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        >
        </script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        >
        </script>
      </Head>
      <Uploader />
      <Images />
    </div>
  );
}
