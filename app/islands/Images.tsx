import { JSX } from "preact";
import { type StateUpdater, useEffect, useState } from "preact/hooks";
import { mode } from "../util/signal.ts";
import toraViewer from "tora-viewer";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

interface Image {
  url: string;
  key: string;
}

const fetchOriginalImages = async (setData: StateUpdater<Image[]>) => {
  const res = await fetch("/api/get_images?type=public");
  const resJson = await res.json();

  setData(resJson.images);
};

const fetchMiniImages = async (setData: StateUpdater<Image[]>) => {
  const res = await fetch("/api/get_images?type=mini");
  const resJson = await res.json();

  setData(resJson.images);
};

export default function Images(_props: JSX.HTMLAttributes) {
  const [originalImages, setOriginalImages] = useState<Image[]>([]);
  const [miniImages, setMiniImages] = useState<Image[]>([]);

  useEffect(() => {
    fetchOriginalImages(setOriginalImages);
    fetchMiniImages(setMiniImages);
    mode.value = 0;
  }, [mode.value]);

  const openViewer = (index: number) => {
    const viewer = toraViewer(
      originalImages.map((image: Image, index: number) => {
        return { url: image.url, thumbnailUrl: miniImages[index].url };
      }),
      {
        pageStyle: "normal",
      },
    );
    viewer.goTo(index);
    disableBodyScroll(document.querySelector("body"));

    // ビューア―の閉じるのに合わせてスクロールロックの解除処理を設定する
    const originDispose = viewer.dispose;
    const boundDispose = originDispose.bind(viewer);
    const newDispose = () => {
      clearAllBodyScrollLocks();
      boundDispose();
    };
    viewer.dispose = newDispose;
  };

  return (
    <div class="flex justify-center container">
      <div class="flex flex-wrap w-full justify-center container">
        {!miniImages ? "" : miniImages.map((image: Image, index: number) => (
          <div
            class="my-2 px-1 w-32 w-full"
            key={`key-${image.key}`}
            style="background-image: url(/logo.svg); background-repeat: no-repeat; background-position: center center;"
          >
            <img
              src={image.url}
              onClick={() => openViewer(index)}
              class="w-32 h-32 mx-auto rounded-lg border-gray-300 border-4 hover:rotate-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
