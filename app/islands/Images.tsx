import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { mode } from "../util/signal.ts";
import toraViewer from "tora-viewer";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
} from "body-scroll-lock";


const fetchOriginalImages = async (setData: (p: []) => {}) => {
  const res = await fetch("/api/get_images?type=public");
  const resJson = await res.json();

  setData(resJson.images);
};

const fetchMiniImages = async (setData: (p: []) => {}) => {
  const res = await fetch("/api/get_images?type=mini");
  const resJson = await res.json();

  setData(resJson.images);
};

export default function Images(_props: JSX.HTMLAttributes) {
  const [originalImages, setOriginalImages] = useState([]);
  const [miniImages, setMiniImages] = useState([]);

  useEffect(() => {
    fetchOriginalImages(setOriginalImages);
    fetchMiniImages(setMiniImages);
    mode.value = 0;
  }, [mode.value]);

  const openViewer = (index: number) => {
    const viewer = toraViewer(
      originalImages.map((image: { url: string }, index: number) => {
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
    const bindedDispose = originDispose.bind(viewer);
    const newDispose = () => {
      clearAllBodyScrollLocks();
      bindedDispose();
    };
    viewer.dispose = newDispose;
  };

  return (
    <div class="flex justify-center container">
      <div class="flex flex-wrap w-full justify-center container">
        {!miniImages ? "" : miniImages.map((image:{url:string}, index:number) => (
          <div class="my-2 px-1 w-32 w-full" key={`key-${index}`}>
            <img src={image.url} onClick={() => openViewer(index)} class="mx-auto rounded-lg hover:rotate-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
