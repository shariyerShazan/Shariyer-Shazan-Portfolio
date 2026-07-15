"use client";

import React, { useState } from "react";
import { FiDollarSign, FiClock, FiMessageSquare, FiTrendingUp, FiServer, FiShield, FiCornerRightDown } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

type TabType = "stripe" | "auction" | "chat";

export function FinnVisualizer() {
  const [activeTab, setActiveTab] = useState<TabType>("stripe");
  const [selectedStripeNode, setSelectedStripeNode] = useState<string>("buyer");
  const [selectedAuctionNode, setSelectedAuctionNode] = useState<string>("auctionInit");

  const renderStripeFlow = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FiDollarSign className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Stripe Connect Split Payment</h4>
              <p className="text-[11px] text-slate-400">Escrow and split-payment sequence displaying direct platform fee cuts.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider bg-[#00f0ff]/10 px-2.5 py-1 rounded-full border border-[#00f0ff]/20">
            STRIPE CONNECT TRANSFER API
          </span>
        </div>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center min-h-[140px] px-2 py-4">
          
          {/* Step 1: Buyer Checkout */}
          <div 
            className={`lg:col-span-3 p-4 rounded-xl bg-slate-950 transition-all duration-300 cursor-pointer ${
              selectedStripeNode === "buyer"
                ? "border-2 border-emerald-500 bg-emerald-500/5 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                : "border border-slate-800 hover:border-emerald-500/50"
            }`}
            onClick={() => setSelectedStripeNode("buyer")}
          >
            <div className="text-[10px] font-mono text-emerald-400 mb-1">STEP 01 // BUYER</div>
            <div className="text-xs font-bold text-white mb-1">Buy Now Clicked</div>
            <div className="text-[10px] text-slate-400">Buyer initiates purchase of $100. Tokenized card submitted to Stripe.</div>
            <div className={`mt-2 font-mono text-[9px] text-slate-500 transition-colors ${selectedStripeNode === "buyer" ? "text-emerald-400 font-semibold" : ""}`}>
              POST /payments/create-intent
            </div>
          </div>

          <div className="flex justify-center lg:col-span-1 text-slate-500">
            <BsArrowRight className="text-xl rotate-90 lg:rotate-0" />
          </div>

          {/* Step 2: NestJS Monolith Orchestrator */}
          <div 
            className={`lg:col-span-4 p-4 rounded-xl bg-slate-950 relative group transition-all duration-300 cursor-pointer ${
              selectedStripeNode === "monolith"
                ? "border-2 border-[#00f0ff] bg-[#00f0ff]/5 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                : "border border-slate-800 hover:border-[#00f0ff]/50"
            }`}
            onClick={() => setSelectedStripeNode("monolith")}
          >
            <div className="text-[10px] font-mono text-[#00f0ff] mb-1">STEP 02 // NESTJS MONOLITH</div>
            <div className="text-xs font-bold text-white mb-1">PaymentIntent Generator</div>
            <p className="text-[10px] text-slate-400">Validates inventory. Creates Stripe PaymentIntent passing `transfer_data` and 10% platform fee parameter.</p>
            <div className="absolute top-2 right-2 flex gap-1">
              <FiServer className="text-slate-500 text-xs" />
            </div>
            <div className={`mt-2 font-mono text-[9px] text-slate-500 transition-colors ${selectedStripeNode === "monolith" ? "text-[#00f0ff] font-semibold" : ""}`}>
              stripe.paymentIntents.create()
            </div>
          </div>

          <div className="flex justify-center lg:col-span-1 text-slate-500">
            <BsArrowRight className="text-xl rotate-90 lg:rotate-0" />
          </div>

          {/* Step 3: Branching Outcomes */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            
            {/* Box A: Platform Fee */}
            <div 
              className={`p-3 rounded-lg bg-slate-950 cursor-pointer transition-all ${
                selectedStripeNode === "platFee"
                  ? "border-2 border-cyan-500 bg-cyan-500/5 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  : "border border-slate-800 hover:border-cyan-500/40"
              }`}
              onClick={() => setSelectedStripeNode("platFee")}
            >
              <div className="text-[9px] font-mono text-cyan-400">PLATFORM REVENUE (10%)</div>
              <div className="text-xs font-semibold text-white">$10.00</div>
              <div className="text-[9px] text-slate-500">Credited to Platform Balance</div>
            </div>

            {/* Box B: Seller Payout */}
            <div 
              className={`p-3 rounded-lg bg-slate-950 cursor-pointer transition-all ${
                selectedStripeNode === "sellerPayout"
                  ? "border-2 border-purple-500 bg-purple-500/5 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                  : "border border-slate-800 hover:border-purple-500/40"
              }`}
              onClick={() => setSelectedStripeNode("sellerPayout")}
            >
              <div className="text-[9px] font-mono text-purple-400">VENDORS SPLIT PAYOUT (90%)</div>
              <div className="text-xs font-semibold text-white">$90.00</div>
              <div className="text-[9px] text-slate-500">Direct Express Bank payout</div>
            </div>

          </div>

        </div>

        {/* Dynamic Detail Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[10px] leading-relaxed text-slate-400">
          {selectedStripeNode === "buyer" && (
            <div>
              <span className="text-emerald-400 font-bold block mb-1">CLIENT GATEWAY INITIATION //</span>
              The React frontend builds payment headers and collects payment tokens. It handles 3D-secure card authentication flows natively inside Stripe Checkout Elements wrappers, keeping client servers free from PCI-DSS regulatory liabilities.
            </div>
          )}
          {selectedStripeNode === "monolith" && (
            <div>
              <span className="text-[#00f0ff] font-bold block mb-1">STRIPE CONNECT METADATA //</span>
              The backend references `application_fee_amount: 1000` (representing 10% of $100.00 expressed as minor units) and `on_behalf_of: seller_stripe_account_id`. Webhook controller parses `payment_intent.succeeded` to release ads to the buyer and trigger transactional emails.
            </div>
          )}
          {selectedStripeNode === "platFee" && (
            <div>
              <span className="text-cyan-400 font-bold block mb-1">PLATFORM SPLIT REVENUE //</span>
              NestJS isolates 10% fees dynamically. This fee covers payment gateway integrations, database indexing overheads, and notification dispatch server expenses. Locked in USD/EUR instantly.
            </div>
          )}
          {selectedStripeNode === "sellerPayout" && (
            <div>
              <span className="text-purple-400 font-bold block mb-1">SELLER EXPRESS VERIFICATION //</span>
              Sellers undergo Stripe Connect express onboarding to provide banking routing details. All payouts bypass platform escrow checks entirely, processing automatically.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAuctionFlow = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <FiClock className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Auction & Bidding State Machine</h4>
              <p className="text-[11px] text-slate-400">Follows listing state shifts from initialization down to cron timer settlements.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-pink-400 uppercase tracking-wider bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
            PRISMA TRANSACTION STATE LOCKS
          </span>
        </div>

        {/* State Machine Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          <div 
            className={`p-3.5 rounded-xl bg-slate-950 transition-all cursor-pointer text-center ${
              selectedAuctionNode === "auctionInit"
                ? "border-2 border-slate-400 bg-slate-400/5 shadow-[0_0_12px_rgba(148,163,184,0.15)]"
                : "border border-slate-900 hover:border-slate-800"
            }`}
            onClick={() => setSelectedAuctionNode("auctionInit")}
          >
            <div className="text-[9px] font-mono text-slate-500 mb-1">STATE 01</div>
            <div className="text-xs font-semibold text-white font-semibold">Create Auction</div>
            <div className="text-[9px] text-[#cbd5e1]/65 mt-2">`AdType = AUCTION`, base price & end time.</div>
          </div>

          <div 
            className={`p-3.5 rounded-xl bg-slate-950 transition-all cursor-pointer text-center ${
              selectedAuctionNode === "biddingOpen"
                ? "border-2 border-pink-500 bg-pink-500/5 shadow-[0_0_12px_rgba(236,72,153,0.15)] animate-pulse"
                : "border border-slate-900 hover:border-slate-800"
            }`}
            onClick={() => setSelectedAuctionNode("biddingOpen")}
          >
            <div className="text-[9px] font-mono text-pink-400 mb-1">STATE 02</div>
            <div className="text-xs font-semibold text-white font-semibold">Active Bidding</div>
            <div className="text-[9px] text-[#cbd5e1]/65 mt-2">Bids accepted. Socket.io broadcasts new bids.</div>
          </div>

          <div 
            className={`p-3.5 rounded-xl bg-slate-950 transition-all cursor-pointer text-center ${
              selectedAuctionNode === "bidValidate"
                ? "border-2 border-amber-500 bg-amber-500/5 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                : "border border-slate-900 hover:border-slate-800"
            }`}
            onClick={() => setSelectedAuctionNode("bidValidate")}
          >
            <div className="text-[9px] font-mono text-amber-500 mb-1">STATE 03</div>
            <div className="text-xs font-semibold text-white font-semibold">Bid Validation</div>
            <div className="text-[9px] text-[#cbd5e1]/65 mt-2">Validates bid &gt; high bid. Prevents concurrency.</div>
          </div>

          <div 
            className={`p-3.5 rounded-xl bg-slate-950 transition-all cursor-pointer text-center ${
              selectedAuctionNode === "timerExpire"
                ? "border-2 border-rose-500 bg-rose-500/5 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                : "border border-slate-900 hover:border-slate-800"
            }`}
            onClick={() => setSelectedAuctionNode("timerExpire")}
          >
            <div className="text-[9px] font-mono text-rose-500 mb-1">STATE 04</div>
            <div className="text-xs font-semibold text-white font-semibold">Timer Expired</div>
            <div className="text-[9px] text-[#cbd5e1]/65 mt-2">Scheduler triggers check: marks block closed.</div>
          </div>

          <div 
            className={`p-3.5 rounded-xl bg-slate-950 transition-all cursor-pointer text-center ${
              selectedAuctionNode === "settlement"
                ? "border-2 border-emerald-500 bg-emerald-500/5 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                : "border border-slate-900 hover:border-emerald-500/30"
            }`}
            onClick={() => setSelectedAuctionNode("settlement")}
          >
            <div className="text-[9px] font-mono text-emerald-400 mb-1">STATE 05</div>
            <div className="text-xs font-semibold text-white font-semibold">Settlement</div>
            <div className="text-[9px] text-[#cbd5e1]/65 mt-2">Binds winning bidder, triggers invoice payment.</div>
          </div>

        </div>

        {/* state explanatory logs */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[10px] leading-relaxed text-slate-400">
          {selectedAuctionNode === "auctionInit" && (
            <div>
              <span className="text-slate-400 font-bold block mb-1">INITIATING AUCTION AD //</span>
              NestJS validation pipelines block listings if basePrice is less than $1 or if the configured endTime is set to less than 1 hour or more than 30 days in the future.
            </div>
          )}
          {selectedAuctionNode === "biddingOpen" && (
            <div>
              <span className="text-pink-400 font-bold block mb-1">REAL-TIME BID BROADCASING //</span>
              Each successful bid emits broad alerts to all clients viewing that specific listing in real-time. Prevents page loads for updates.
            </div>
          )}
          {selectedAuctionNode === "bidValidate" && (
            <div>
              <span className="text-amber-500 font-bold block mb-1">CONCURRENCY & TRANSACTION ISOLATION //</span>
              The validation logic executes inside a Prisma Transaction (`prisma.$transaction`) with strict serializable limits. This prevents two bids from claiming the same rank within millisecond race conditions.
            </div>
          )}
          {selectedAuctionNode === "timerExpire" && (
            <div>
              <span className="text-rose-500 font-bold block mb-1">NESTJS CRON SCHEDULER //</span>
              A recurrent cron service checks active auctions. If endTime is less than or equal to Now, it updates the state target, sets `isSold = true`, and emits alerts: `auction.ended`.
            </div>
          )}
          {selectedAuctionNode === "settlement" && (
            <div>
              <span className="text-emerald-400 font-bold block mb-1">TRANSACTION BINDINGS PAYMENT INTENT //</span>
              Links the `buyerId` of the highest bidder to the `Ad` record. Generates a Stripe checkout intent for the final winning bid, ensuring secure settlement.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChatFlow = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900/40 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FiMessageSquare className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Real-Time Chat & Handshake routing</h4>
              <p className="text-[11px] text-slate-400">Bidirectional client-to-monolith WebSocket data flows.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-sky-400 tracking-wider bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
            SOCKET.IO CHAT ROOMS
          </span>
        </div>

        {/* Chat Diagram */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 p-2">
          
          <div className="flex-1 p-4 rounded-xl bg-slate-950 border border-slate-900 text-center">
            <div className="text-[9px] font-mono text-sky-400 mb-1">CLIENT A // EMITTER</div>
            <div className="text-xs font-semibold text-white">Socket.io Dispatch</div>
            <p className="text-[10px] text-slate-500 mt-2">Dispatches message payload. Checks conversation active details.</p>
            <div className="mt-3 font-mono text-[9px] text-[#cbd5e1]/40">
              socket.emit("message.send", payload)
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-500 font-mono text-[10px]">
            <BsArrowRight className="text-xl rotate-90 md:rotate-0" />
          </div>

          <div className="flex-1 p-4 rounded-xl bg-slate-950 border border-sky-500/30 text-center relative shadow-[0_0_15px_rgba(14,165,233,0.05)]">
            <div className="text-[9px] font-mono text-[#00f0ff] mb-1">NESTJS GATEWAY // CORE</div>
            <div className="text-xs font-semibold text-white">ChatGateway Router</div>
            <p className="text-[10px] text-slate-500 mt-2">Authenticates token on handshake, creates database record, forwards payload to active room participants.</p>
            <div className="mt-3 font-mono text-[9px] text-emerald-400">
              room.to(convoId).emit("message.received")
            </div>
          </div>

          <div className="flex items-center justify-center text-slate-500 font-mono text-[10px]">
            <BsArrowRight className="text-xl rotate-90 md:rotate-0" />
          </div>

          <div className="flex-1 p-4 rounded-xl bg-slate-950 border border-slate-900 text-center">
            <div className="text-[9px] font-mono text-sky-400 mb-1">CLIENT B // RECEIVER</div>
            <div className="text-xs font-semibold text-white">Instant Render</div>
            <p className="text-[10px] text-slate-500 mt-2">Receives event payload. RTK Query triggers cache updates without page refreshes.</p>
            <div className="mt-3 font-mono text-[9px] text-[#cbd5e1]/40">
              socket.on("message.send")
            </div>
          </div>

        </div>

        {/* Description text */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[10px] leading-relaxed text-slate-400">
          <span className="text-sky-400 font-bold block mb-1">MONOLITH CHAT PIPELINE SPECIFICATIONS //</span>
          - **JWT Auth Handshake**: ChatGateway checks the query authorization cookie on startup. Unverified links disconnect instantly.
          - **Scale & Persistence**: Writes new messages to PostgreSQL via Prisma before echoing event packages.
          - **Presence System**: Emits online lists every 3 seconds to highlight user activity.
        </div>

      </div>
    );
  };

  return (
    <div className="w-full bg-[#0a0f1d]/90 border border-[#1e293b]/80 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.015)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4 border-b border-[#1e293b]/50 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <FiServer className="text-[#00f0ff] animate-pulse" />
            <span>FINN // MONOLITIC SERVICE ENGINE</span>
          </h3>
          <p className="text-xs text-slate-400">Interactive structural maps exploring backend architectures, split payments, and websocket pathways.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1.5 bg-[#0f172a] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("stripe")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === "stripe"
                ? "bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            Split Payments
          </button>
          <button
            onClick={() => setActiveTab("auction")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === "auction"
                ? "bg-pink-500/10 border border-pink-500/30 text-pink-400"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            Auction Engine
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-sky-500/10 border border-sky-500/30 text-sky-400"
                : "text-slate-400 hover:text-white border border-transparent"
            }`}
          >
            Real-time Chat
          </button>
        </div>
      </div>

      {/* Flow Containers */}
      <div className="min-h-[220px]">
        {activeTab === "stripe" && renderStripeFlow()}
        {activeTab === "auction" && renderAuctionFlow()}
        {activeTab === "chat" && renderChatFlow()}
      </div>

    </div>
  );
}
