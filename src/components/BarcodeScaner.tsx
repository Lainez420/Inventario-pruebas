"use client";
import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface Props {
  onScan: (code: string) => void;
}

export default function BarcodeScanner({ onScan }: Props) {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 100 } },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText); // devuelve el código
        scanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScan]);

  return <div id="reader" ref={scannerRef} className="w-full text-black" />;
}
