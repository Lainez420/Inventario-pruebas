"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }: BarcodeScannerModalProps) {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "barcode-scanner",
      { fps: 10, qrbox: { width: 250, height: 250} },
      false
    );

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
        onClose();
      },
      (errorMessage) => {
        console.warn("Error escaneando:", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch(err => console.error("Error limpiando scanner", err));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-[90%] max-w-md bg-white rounded-xl shadow-lg p-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Cerrar
        </button>
        <div id="barcode-scanner" ref={scannerRef} className="text-black"/>
      </div>
    </div>
  );
}
