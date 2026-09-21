import React, { useState } from "react";
import { X, Printer, FileText, Sparkles } from "lucide-react";
import { parseWhatsAppOrderText, ParsedWhatsAppOrder } from "../utils/whatsappOrderParser";
import OrderReceiptPoster from "./OrderReceiptPoster";

interface WhatsAppPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppPrintModal: React.FC<WhatsAppPrintModalProps> = ({ isOpen, onClose }) => {
  const [rawText, setRawText] = useState("");
  const [parsedOrder, setParsedOrder] = useState<ParsedWhatsAppOrder | null>(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleParseAndShow = () => {
    if (!rawText.trim()) {
      setError("Please paste a WhatsApp order message first.");
      return;
    }
    const order = parseWhatsAppOrderText(rawText);
    if (!order || order.items.length === 0) {
      setError("Could not parse order items. Please ensure you paste the full FresCo WhatsApp order text.");
      return;
    }
    setError("");
    setParsedOrder(order);
  };

  return (
    <>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Printer className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base">Print WhatsApp Order Receipt</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-neutral-300 mb-3">
            Paste the WhatsApp order message received from the customer to generate a print-ready receipt poster:
          </p>

          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              if (error) setError("");
            }}
            placeholder="Paste WhatsApp order message here (e.g. Hello FresCo HealthCraft Pune! I'd like to place an order...)"
            rows={7}
            className="w-full bg-neutral-950 border border-white/10 rounded-xl p-3 text-xs text-neutral-200 font-mono focus:outline-none focus:border-emerald-500 transition-colors resize-none"
          />

          {error && (
            <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleParseAndShow}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Poster Bill</span>
            </button>
          </div>
        </div>
      </div>

      {parsedOrder && (
        <OrderReceiptPoster
          isOpen={true}
          onClose={() => setParsedOrder(null)}
          order={parsedOrder}
        />
      )}
    </>
  );
};

export default WhatsAppPrintModal;
