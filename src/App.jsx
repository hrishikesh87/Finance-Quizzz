import { useState, useEffect, useRef } from "react";

const ALL_QUESTIONS = [
  // ── TIME VALUE OF MONEY (20) ──────────────────────────────────────────────
  { id: 1, topic: "Time Value of Money", difficulty: "Easy", question: "What is the present value of ₹10,000 received after 2 years at 10% discount rate?", options: ["₹8,264", "₹8,000", "₹9,091", "₹8,500"], answer: 0, explanation: "PV = 10,000 / (1.10)² = 10,000 / 1.21 ≈ ₹8,264" },
  { id: 2, topic: "Time Value of Money", difficulty: "Easy", question: "Which concept states that money available today is worth more than the same amount in the future?", options: ["Inflation effect", "Time Value of Money", "Opportunity cost", "Compounding"], answer: 1, explanation: "TVM is the foundational principle that a rupee today is worth more than a rupee tomorrow due to its earning potential." },
  { id: 3, topic: "Time Value of Money", difficulty: "Easy", question: "Future Value of ₹5,000 invested at 8% p.a. for 3 years (simple interest) is:", options: ["₹6,298", "₹6,200", "₹6,000", "₹6,350"], answer: 1, explanation: "FV (simple) = 5,000 × (1 + 0.08 × 3) = 5,000 × 1.24 = ₹6,200" },
  { id: 4, topic: "Time Value of Money", difficulty: "Medium", question: "An annuity that pays ₹2,000 per year for 5 years at 6% discount rate has a PV of approximately:", options: ["₹8,425", "₹10,000", "₹7,900", "₹9,200"], answer: 0, explanation: "PV annuity = 2000 × [(1 - 1/1.06⁵) / 0.06] ≈ 2000 × 4.212 ≈ ₹8,425" },
  { id: 5, topic: "Time Value of Money", difficulty: "Medium", question: "Effective Annual Rate when nominal rate is 12% compounded quarterly is:", options: ["12.55%", "12.00%", "12.36%", "13.00%"], answer: 0, explanation: "EAR = (1 + 0.12/4)⁴ − 1 = (1.03)⁴ − 1 ≈ 12.55%" },
  { id: 6, topic: "Time Value of Money", difficulty: "Medium", question: "A perpetuity pays ₹500 per year. At 8% discount rate, its present value is:", options: ["₹6,250", "₹5,000", "₹4,000", "₹7,000"], answer: 0, explanation: "PV of perpetuity = C / r = 500 / 0.08 = ₹6,250" },
  { id: 7, topic: "Time Value of Money", difficulty: "Hard", question: "You invest ₹1 lakh today and ₹50,000 at end of year 2 at 10%. Total FV at end of year 4 is:", options: ["₹2,07,050", "₹1,95,000", "₹2,15,500", "₹1,87,000"], answer: 0, explanation: "FV1 = 1,00,000 × 1.1⁴ = 1,46,410. FV2 = 50,000 × 1.1² = 60,500. Total ≈ ₹2,06,910 ≈ ₹2,07,050" },
  { id: 8, topic: "Time Value of Money", difficulty: "Hard", question: "Doubling time at 9% compounded annually (Rule of 72) is approximately:", options: ["8 years", "7 years", "9 years", "10 years"], answer: 0, explanation: "Rule of 72: 72 / 9 = 8 years" },
  { id: 9, topic: "Time Value of Money", difficulty: "Easy", question: "Discounting is the process of:", options: ["Finding future value", "Finding present value", "Calculating interest", "None of these"], answer: 1, explanation: "Discounting converts future cash flows to their present value equivalents." },
  { id: 10, topic: "Time Value of Money", difficulty: "Medium", question: "If PV = ₹10,000, FV = ₹14,641, and time = 4 years, the annual interest rate is:", options: ["10%", "8%", "12%", "9%"], answer: 0, explanation: "r = (FV/PV)^(1/n) − 1 = (14641/10000)^0.25 − 1 = 1.1 − 1 = 10%" },
  { id: 11, topic: "Time Value of Money", difficulty: "Hard", question: "A growing perpetuity pays ₹1,000 next year, growing at 3% forever. At 8% discount rate, PV is:", options: ["₹20,000", "₹10,000", "₹25,000", "₹15,000"], answer: 0, explanation: "PV = C / (r − g) = 1000 / (0.08 − 0.03) = 1000 / 0.05 = ₹20,000" },
  { id: 12, topic: "Time Value of Money", difficulty: "Easy", question: "Which of the following increases the Present Value of a future cash flow?", options: ["Higher discount rate", "Longer time period", "Lower discount rate", "Higher inflation"], answer: 2, explanation: "A lower discount rate reduces the denominator in PV formula, increasing the present value." },
  { id: 13, topic: "Time Value of Money", difficulty: "Medium", question: "Future value of ₹10,000 at 10% compounded semi-annually for 2 years is:", options: ["₹12,155", "₹12,100", "₹12,000", "₹12,250"], answer: 0, explanation: "FV = 10,000 × (1 + 0.05)⁴ = 10,000 × 1.2155 = ₹12,155" },
  { id: 14, topic: "Time Value of Money", difficulty: "Hard", question: "An annuity due differs from an ordinary annuity because:", options: ["Payments are larger", "Payments occur at beginning of each period", "It has no end", "It pays forever"], answer: 1, explanation: "In an annuity due, cash flows occur at the start of each period, making it worth more than an ordinary annuity by a factor of (1+r)." },
  { id: 15, topic: "Time Value of Money", difficulty: "Medium", question: "CAGR of an investment that grew from ₹50,000 to ₹80,000 in 5 years is approximately:", options: ["9.86%", "10.5%", "8.0%", "12%"], answer: 0, explanation: "CAGR = (80,000/50,000)^(1/5) − 1 = (1.6)^0.2 − 1 ≈ 9.86%" },
  { id: 16, topic: "Time Value of Money", difficulty: "Easy", question: "The discount rate that makes NPV equal to zero is called:", options: ["WACC", "Cost of equity", "IRR", "Hurdle rate"], answer: 2, explanation: "The Internal Rate of Return (IRR) is the rate at which the NPV of a project equals zero." },
  { id: 17, topic: "Time Value of Money", difficulty: "Medium", question: "A loan of ₹1,00,000 at 12% p.a. for 1 year, compounded monthly. EMI is approximately:", options: ["₹8,885", "₹9,000", "₹8,333", "₹8,500"], answer: 0, explanation: "EMI = [P × r × (1+r)^n] / [(1+r)^n − 1], r=1%, n=12. EMI ≈ ₹8,885" },
  { id: 18, topic: "Time Value of Money", difficulty: "Hard", question: "If the nominal rate is 18% compounded monthly, the EAR is:", options: ["19.56%", "18.00%", "19.00%", "18.75%"], answer: 0, explanation: "EAR = (1 + 0.18/12)^12 − 1 = (1.015)^12 − 1 ≈ 19.56%" },
  { id: 19, topic: "Time Value of Money", difficulty: "Easy", question: "Which factor increases with higher interest rates and longer time periods?", options: ["Present Value Factor", "Discount Factor", "Future Value Factor", "Annuity Present Value Factor"], answer: 2, explanation: "The Future Value Factor (1+r)^n increases with both r and n." },
  { id: 20, topic: "Time Value of Money", difficulty: "Medium", question: "Net Present Value (NPV) rule states: accept a project if NPV is:", options: ["Negative", "Zero", "Positive", "Equal to IRR"], answer: 2, explanation: "A positive NPV means the project generates value above the required rate of return — accept it." },

  // ── CAPITAL BUDGETING (20) ─────────────────────────────────────────────────
  { id: 21, topic: "Capital Budgeting", difficulty: "Easy", question: "Payback Period is the time taken to:", options: ["Earn profit equal to investment", "Recover initial investment from cash flows", "Achieve IRR", "Reach break-even"], answer: 1, explanation: "Payback Period measures how long it takes for cumulative cash inflows to equal the initial outlay." },
  { id: 22, topic: "Capital Budgeting", difficulty: "Easy", question: "Which capital budgeting method ignores time value of money?", options: ["NPV", "IRR", "Payback Period", "PI"], answer: 2, explanation: "Simple Payback Period does not discount cash flows, ignoring TVM." },
  { id: 23, topic: "Capital Budgeting", difficulty: "Medium", question: "A project costs ₹1,00,000 and generates ₹30,000/year for 5 years at 10% discount rate. NPV is:", options: ["₹13,723", "₹50,000", "−₹5,000", "₹20,000"], answer: 0, explanation: "NPV = 30,000 × PVIFA(10%,5) − 1,00,000 = 30,000 × 3.791 − 1,00,000 = ₹13,723" },
  { id: 24, topic: "Capital Budgeting", difficulty: "Medium", question: "Profitability Index (PI) of a project with NPV = ₹20,000 and initial investment = ₹1,00,000 is:", options: ["1.20", "0.20", "1.00", "2.00"], answer: 0, explanation: "PI = (NPV + Initial Investment) / Initial Investment = 1,20,000 / 1,00,000 = 1.20" },
  { id: 25, topic: "Capital Budgeting", difficulty: "Hard", question: "Project A: NPV = ₹50,000, IRR = 15%. Project B: NPV = ₹40,000, IRR = 20%. Which to choose (mutually exclusive)?", options: ["Project B (higher IRR)", "Project A (higher NPV)", "Both", "Cannot determine"], answer: 1, explanation: "For mutually exclusive projects, NPV rule is superior. Choose Project A with higher NPV." },
  { id: 26, topic: "Capital Budgeting", difficulty: "Easy", question: "Accounting Rate of Return (ARR) is based on:", options: ["Cash flows", "Market value", "Accounting profits", "Discounted flows"], answer: 2, explanation: "ARR uses average accounting profit divided by average investment — not cash flows." },
  { id: 27, topic: "Capital Budgeting", difficulty: "Medium", question: "Incremental cash flow analysis in capital budgeting excludes:", options: ["Opportunity costs", "Sunk costs", "Cannibalization effects", "Tax savings"], answer: 1, explanation: "Sunk costs are already incurred and irrelevant to future capital budgeting decisions." },
  { id: 28, topic: "Capital Budgeting", difficulty: "Hard", question: "A project may have multiple IRRs when its cash flows are:", options: ["Always positive throughout", "Non-conventional — having multiple sign changes", "Conventional with one sign change", "Discounted at WACC"], answer: 1, explanation: "By Descartes' rule of signs, the number of IRRs equals the number of sign changes in cash flows. Conventional cash flows (one sign change) have a unique IRR; non-conventional cash flows can produce multiple IRRs." },
  { id: 29, topic: "Capital Budgeting", difficulty: "Medium", question: "Terminal value in capital budgeting refers to:", options: ["Initial investment", "Cash flow at project end including salvage value", "WACC", "Depreciation"], answer: 1, explanation: "Terminal cash flow includes salvage/residual value and working capital recovery at project end." },
  { id: 30, topic: "Capital Budgeting", difficulty: "Easy", question: "If IRR > Required Rate of Return, the project should be:", options: ["Rejected", "Deferred", "Accepted", "Reassessed"], answer: 2, explanation: "IRR > hurdle rate means the project returns more than its cost of capital — accept it." },
  { id: 31, topic: "Capital Budgeting", difficulty: "Hard", question: "Equivalent Annual Annuity (EAA) is used to compare projects with:", options: ["Same cost", "Different risk profiles", "Unequal lives", "Same cash flows"], answer: 2, explanation: "EAA converts NPV into an annualized figure, enabling fair comparison of projects with different lifespans." },
  { id: 32, topic: "Capital Budgeting", difficulty: "Medium", question: "Capital rationing occurs when:", options: ["Projects have negative NPV", "Funds available are limited relative to positive NPV projects", "IRR equals WACC", "No projects are available"], answer: 1, explanation: "Capital rationing forces ranking/selection among positive NPV projects due to budget constraints." },
  { id: 33, topic: "Capital Budgeting", difficulty: "Easy", question: "Depreciation is relevant in capital budgeting primarily because of its:", options: ["Cash nature", "Tax shield effect", "Asset creation", "Revenue impact"], answer: 1, explanation: "Though non-cash, depreciation reduces taxable income, creating a tax shield that affects after-tax cash flows." },
  { id: 34, topic: "Capital Budgeting", difficulty: "Medium", question: "Modified IRR (MIRR) addresses the limitation of IRR related to:", options: ["Project size", "Reinvestment rate assumption", "Payback period", "Sunk costs"], answer: 1, explanation: "MIRR assumes reinvestment at WACC (not IRR itself), making it more realistic than conventional IRR." },
  { id: 35, topic: "Capital Budgeting", difficulty: "Hard", question: "A project's NPV profile shows NPV on Y-axis and discount rate on X-axis. At the X-intercept:", options: ["NPV = Initial Investment", "NPV = 0 (IRR point)", "PI = 1", "Payback = Life"], answer: 1, explanation: "The X-intercept of the NPV profile is where NPV = 0, which by definition is the IRR." },
  { id: 36, topic: "Capital Budgeting", difficulty: "Easy", question: "Which method gives the percentage return on an investment?", options: ["NPV", "Payback Period", "IRR", "PI"], answer: 2, explanation: "IRR is expressed as a percentage rate of return, making it intuitive for comparison against cost of capital." },
  { id: 37, topic: "Capital Budgeting", difficulty: "Medium", question: "Opportunity cost in capital budgeting is best described as:", options: ["The cost of debt", "The foregone return from the best alternative use of resources", "Depreciation", "Tax rate"], answer: 1, explanation: "Opportunity cost captures the value of the next-best alternative sacrificed when resources are committed." },
  { id: 38, topic: "Capital Budgeting", difficulty: "Hard", question: "Sensitivity analysis in capital budgeting measures:", options: ["Probability of positive NPV", "Change in NPV for a unit change in one input variable", "Expected NPV", "Risk-adjusted discount rate"], answer: 1, explanation: "Sensitivity analysis tests how sensitive NPV is to changes in key assumptions like sales, cost, or discount rate." },
  { id: 39, topic: "Capital Budgeting", difficulty: "Medium", question: "Working capital requirement is treated as a cash outflow at the beginning and:", options: ["Expensed over project life", "Recovered at project end", "Ignored", "Depreciated"], answer: 1, explanation: "Net working capital invested is recovered (reversed) at the terminal year of the project." },
  { id: 40, topic: "Capital Budgeting", difficulty: "Easy", question: "Discounted Payback Period is superior to simple Payback Period because:", options: ["It is easier to calculate", "It accounts for time value of money", "It considers all cash flows", "It uses accounting profit"], answer: 1, explanation: "Discounted Payback Period uses present values of cash flows, incorporating TVM unlike simple payback." },

  // ── WACC & COST OF CAPITAL (20) ───────────────────────────────────────────
  { id: 41, topic: "WACC & Cost of Capital", difficulty: "Easy", question: "WACC stands for:", options: ["Weighted Average Cost of Capital", "Working Asset Cost Calculation", "Weighted Accounting Cost of Capital", "None"], answer: 0, explanation: "WACC is the blended cost of all capital sources (equity, debt, etc.) weighted by their market value proportions." },
  { id: 42, topic: "WACC & Cost of Capital", difficulty: "Easy", question: "The cost of debt is adjusted for taxes because:", options: ["Debt is cheaper", "Interest payments are tax-deductible", "Equity is expensive", "Debt has no risk"], answer: 1, explanation: "Interest expense reduces taxable income, so after-tax cost of debt = Kd × (1 − tax rate)." },
  { id: 43, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "A firm has 60% equity (Ke=15%) and 40% debt (Kd=8%, tax=30%). WACC is:", options: ["11.24%", "12.00%", "10.00%", "13.50%"], answer: 0, explanation: "WACC = 0.60×15% + 0.40×8%×(1−0.30) = 9% + 2.24% = 11.24%" },
  { id: 44, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "CAPM formula for cost of equity is:", options: ["Ke = Rf − β(Rm)", "Ke = Rf + β(Rm − Rf)", "Ke = D1/P0 + g", "Ke = EPS/Price"], answer: 1, explanation: "CAPM: Ke = Risk-free rate + Beta × (Market premium). The second option matches this formula." },
  { id: 45, topic: "WACC & Cost of Capital", difficulty: "Hard", question: "If a stock has Beta = 1.5, Rf = 6%, and Market Return = 12%, the cost of equity using CAPM is:", options: ["15%", "18%", "12%", "14%"], answer: 0, explanation: "Ke = 6% + 1.5 × (12% − 6%) = 6% + 9% = 15%" },
  { id: 46, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "The Dividend Discount Model (DDM) for cost of equity is:", options: ["Ke = D0/P0", "Ke = D1/P0 + g", "Ke = EPS × P/E", "Ke = EBIT/Assets"], answer: 1, explanation: "Gordon's DDM: Ke = (Expected Dividend / Current Price) + Growth Rate." },
  { id: 47, topic: "WACC & Cost of Capital", difficulty: "Easy", question: "Which component of capital is typically the cheapest source of finance?", options: ["Equity", "Preference shares", "Retained earnings", "Debt"], answer: 3, explanation: "Debt is cheapest due to tax deductibility of interest and lower risk to lenders." },
  { id: 48, topic: "WACC & Cost of Capital", difficulty: "Hard", question: "Flotation costs affect the cost of capital by:", options: ["Reducing the tax rate", "Increasing the effective cost (reducing net proceeds)", "Lowering WACC", "Increasing market value"], answer: 1, explanation: "Flotation costs reduce the net proceeds from a new issue, effectively increasing the cost of that capital source." },
  { id: 49, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "WACC should be used as the discount rate when:", options: ["Project risk matches firm's average risk", "Project is riskier than firm average", "Only equity is used", "Firm has no debt"], answer: 0, explanation: "WACC is appropriate when the project has similar risk to the firm's existing operations." },
  { id: 50, topic: "WACC & Cost of Capital", difficulty: "Hard", question: "Beta of an unlevered firm (asset beta) can be obtained by:", options: ["Hamada equation", "CAPM directly", "DDM", "Gordon model"], answer: 0, explanation: "Hamada equation strips out the financial leverage effect: βU = βL / [1 + (1−T)(D/E)]" },
  { id: 51, topic: "WACC & Cost of Capital", difficulty: "Easy", question: "Retained earnings have a cost because:", options: ["They create debt", "Shareholders have an opportunity cost", "They increase tax", "They reduce assets"], answer: 1, explanation: "Retained earnings represent foregone dividends — shareholders expect at least the cost of equity return." },
  { id: 52, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "If a firm increases its debt ratio, WACC will generally:", options: ["Always increase", "Always decrease", "Initially decrease then increase (U-shaped)", "Remain constant"], answer: 2, explanation: "Per Modigliani-Miller with taxes and financial distress, WACC decreases with initial leverage but rises after optimal point." },
  { id: 53, topic: "WACC & Cost of Capital", difficulty: "Hard", question: "Yield to Maturity (YTM) on a bond is used as:", options: ["Cost of equity", "Pre-tax cost of debt", "WACC directly", "Risk-free rate"], answer: 1, explanation: "YTM represents the market's required return on debt. After-tax cost = YTM × (1 − tax rate)." },
  { id: 54, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "Market value weights are preferred over book value weights in WACC because:", options: ["They are easier to calculate", "They reflect current economic conditions", "Book values are unavailable", "Market weights are stable"], answer: 1, explanation: "Market values reflect what investors actually require today, making WACC more relevant for decision-making." },
  { id: 55, topic: "WACC & Cost of Capital", difficulty: "Easy", question: "Risk-free rate in CAPM is typically proxied by:", options: ["Corporate bond yield", "Government T-bill or bond yield", "Bank FD rate", "LIBOR only"], answer: 1, explanation: "Government securities (T-bills/G-Secs) are considered risk-free as default risk is negligible." },
  { id: 56, topic: "WACC & Cost of Capital", difficulty: "Hard", question: "A project-specific discount rate (instead of WACC) should be used when:", options: ["Project risk = firm risk", "Project is in a different risk class", "Firm has no equity", "Tax rate is zero"], answer: 1, explanation: "Using WACC for a project with different risk leads to misallocation. A risk-adjusted rate specific to the project should be used." },
  { id: 57, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "Equity Risk Premium (ERP) is defined as:", options: ["Rm only", "Rf only", "Rm − Rf", "β × Rf"], answer: 2, explanation: "ERP = Market Return − Risk-free Rate. It compensates equity investors for bearing market risk." },
  { id: 58, topic: "WACC & Cost of Capital", difficulty: "Easy", question: "Beta = 1 means the stock moves:", options: ["Twice as much as market", "Opposite to market", "Same as market", "Half as much as market"], answer: 2, explanation: "Beta of 1 means the stock has the same systematic risk and moves in line with the market." },
  { id: 59, topic: "WACC & Cost of Capital", difficulty: "Hard", question: "Pure-play method for estimating project beta involves:", options: ["Using the firm's own historical beta", "Finding a comparable company in the same business, unlevering its beta, then re-levering", "Using industry average", "Using risk-free rate only"], answer: 1, explanation: "Pure-play: find a proxy firm, unlever its beta to get asset beta, then re-lever at your firm's D/E to get project beta." },
  { id: 60, topic: "WACC & Cost of Capital", difficulty: "Medium", question: "Cost of preference share capital with constant dividend D, price P, and flotation cost F is:", options: ["D / P", "D / (P − F)", "D × P", "D + F / P"], answer: 1, explanation: "Kp = D / (Net proceeds) = D / (P − F), reflecting the actual cost after issue expenses." },

  // ── EQUITY VALUATION & RESEARCH (20) ──────────────────────────────────────
  { id: 61, topic: "Equity Valuation", difficulty: "Easy", question: "Intrinsic value of a stock is the:", options: ["Market price", "Book value", "Present value of all expected future cash flows", "EPS × P/E multiple"], answer: 2, explanation: "Intrinsic value is the theoretical 'true' worth — PV of all expected future cash flows discounted at required return." },
  { id: 62, topic: "Equity Valuation", difficulty: "Easy", question: "Gordon Growth Model assumes dividends grow at a:", options: ["Variable rate", "Zero rate", "Constant rate forever", "Declining rate"], answer: 2, explanation: "GGM (constant growth DDM) assumes dividends grow at a constant rate g into perpetuity." },
  { id: 63, topic: "Equity Valuation", difficulty: "Medium", question: "A stock pays D1 = ₹5, required return = 12%, growth = 7%. Intrinsic value is:", options: ["₹100", "₹71.43", "₹50", "₹83.33"], answer: 0, explanation: "V = D1 / (Ke − g) = 5 / (0.12 − 0.07) = 5 / 0.05 = ₹100" },
  { id: 64, topic: "Equity Valuation", difficulty: "Medium", question: "Price-to-Earnings (P/E) ratio indicates:", options: ["Dividend yield", "How much investors pay per rupee of earnings", "Book value per share", "Earnings growth rate"], answer: 1, explanation: "P/E = Market Price / EPS. It shows the market's valuation multiple on current earnings." },
  { id: 65, topic: "Equity Valuation", difficulty: "Hard", question: "In a two-stage DDM, which phase is valued using Gordon Growth Model?", options: ["High-growth phase", "Terminal/stable phase", "Both phases equally", "Neither"], answer: 1, explanation: "The terminal/stable phase is valued as a growing perpetuity using GGM; the high-growth phase uses explicit period discounting." },
  { id: 66, topic: "Equity Valuation", difficulty: "Medium", question: "EV/EBITDA multiple is preferred over P/E because:", options: ["P/E is more accurate", "EV/EBITDA is capital-structure and tax neutral", "P/E includes debt", "EBITDA is smaller"], answer: 1, explanation: "EV/EBITDA excludes capital structure and tax effects, enabling cleaner cross-company comparison." },
  { id: 67, topic: "Equity Valuation", difficulty: "Easy", question: "Enterprise Value (EV) = Market Cap + Debt − ?", options: ["Revenue", "EBITDA", "Cash & equivalents", "Net profit"], answer: 2, explanation: "EV = Market Cap + Debt − Cash. Cash is subtracted as it can immediately reduce net debt." },
  { id: 68, topic: "Equity Valuation", difficulty: "Hard", question: "In DCF valuation, terminal value typically represents what share of total value?", options: ["10–20%", "30–40%", "60–80%", "100%"], answer: 2, explanation: "For most companies, terminal value accounts for 60–80%+ of total DCF value, highlighting its sensitivity." },
  { id: 69, topic: "Equity Valuation", difficulty: "Medium", question: "Price-to-Book (P/B) ratio below 1 typically suggests:", options: ["Overvaluation", "Stock is trading below net asset value", "High growth expectations", "Strong earnings"], answer: 1, explanation: "P/B < 1 means the market values the firm below its book (accounting) net assets — could signal distress or undervaluation." },
  { id: 70, topic: "Equity Valuation", difficulty: "Easy", question: "Free Cash Flow to Equity (FCFE) is used to value:", options: ["Debt instruments", "Entire firm", "Only equity shareholders' claim", "Preference shares"], answer: 2, explanation: "FCFE represents cash available to equity holders after debt obligations — used in equity valuation models." },
  { id: 71, topic: "Equity Valuation", difficulty: "Hard", question: "Residual Income model values equity as Book Value + PV of:", options: ["Future dividends", "Future FCF", "Future excess returns over equity cost", "Terminal value"], answer: 2, explanation: "Residual Income = Net Income − (Equity × Ke). The model adds PV of future RI to current book value." },
  { id: 72, topic: "Equity Valuation", difficulty: "Medium", question: "PEG ratio = P/E divided by:", options: ["Revenue growth", "EPS growth rate", "Book value", "Dividend yield"], answer: 1, explanation: "PEG = P/E ÷ EPS growth rate. A PEG < 1 suggests potential undervaluation relative to growth." },
  { id: 73, topic: "Equity Valuation", difficulty: "Easy", question: "Comparable Company Analysis (Comps) values a firm using:", options: ["DCF only", "Multiples of similar publicly traded firms", "Book value", "Asset liquidation value"], answer: 1, explanation: "Comps applies industry trading multiples (P/E, EV/EBITDA) from peer companies to derive valuation." },
  { id: 74, topic: "Equity Valuation", difficulty: "Hard", question: "Which valuation method is most appropriate for a loss-making startup?", options: ["P/E multiple", "EV/Revenue or DCF with explicit growth assumptions", "Dividend Discount Model", "Book value"], answer: 1, explanation: "P/E and DDM require positive earnings/dividends. EV/Revenue or forward DCF works better for unprofitable growth firms." },
  { id: 75, topic: "Equity Valuation", difficulty: "Medium", question: "Bull case in equity research means:", options: ["Base case scenario", "Most optimistic scenario with highest price target", "Bear/downside scenario", "Regulatory risk scenario"], answer: 1, explanation: "Bull case = optimistic assumptions (high growth, margin expansion) producing the highest price target." },
  { id: 76, topic: "Equity Valuation", difficulty: "Easy", question: "Dividend Yield = Annual Dividend / ?", options: ["EPS", "Book value per share", "Market price per share", "EBITDA"], answer: 2, explanation: "Dividend Yield = DPS / Market Price. It shows income return as a percentage of stock price." },
  { id: 77, topic: "Equity Valuation", difficulty: "Hard", question: "In precedent transaction analysis, the control premium is added because:", options: ["Minority shareholders are excluded", "Acquirer pays above market price for control of the target", "Synergies reduce value", "Market price already includes premium"], answer: 1, explanation: "In M&A transactions, acquirers pay a control premium (typically 20–40%) over pre-deal market price." },
  { id: 78, topic: "Equity Valuation", difficulty: "Medium", question: "FCFF (Free Cash Flow to Firm) = EBIT(1-T) + D&A − CAPEX − ?", options: ["Interest", "Dividends", "Change in Working Capital", "Tax"], answer: 2, explanation: "FCFF = NOPAT + D&A − CAPEX − ΔNWC. It captures cash available to all capital providers." },
  { id: 79, topic: "Equity Valuation", difficulty: "Easy", question: "A stock with high P/E is generally considered:", options: ["Undervalued", "Value stock", "Growth stock", "Dividend stock"], answer: 2, explanation: "High P/E suggests investors expect high earnings growth — typical of growth stocks (e.g., tech companies)." },
  { id: 80, topic: "Equity Valuation", difficulty: "Hard", question: "Sum-of-the-Parts (SOTP) valuation is most useful for:", options: ["Single-segment companies", "Conglomerates with diverse business units", "Startups", "Regulated utilities only"], answer: 1, explanation: "SOTP values each segment separately using appropriate multiples/DCF, then aggregates — ideal for diversified firms." },

  // ── FINANCIAL STATEMENT ANALYSIS (20) ─────────────────────────────────────
  { id: 81, topic: "Financial Statement Analysis", difficulty: "Easy", question: "Which financial statement shows a company's financial position at a point in time?", options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Statement of Changes in Equity"], answer: 2, explanation: "Balance Sheet (Statement of Financial Position) shows assets, liabilities and equity at a specific date." },
  { id: 82, topic: "Financial Statement Analysis", difficulty: "Easy", question: "EBITDA stands for:", options: ["Earnings Before Interest, Tax, Depreciation, Amortization", "Earnings Before Income Tax and Dividends Added", "Equity Before Interest, Tax, and Depreciation Adjustments", "None"], answer: 0, explanation: "EBITDA = Earnings Before Interest, Taxes, Depreciation & Amortization — a proxy for operating cash earnings." },
  { id: 83, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Current Ratio = Current Assets / Current Liabilities. A ratio of 2 means:", options: ["Firm has twice as much debt as assets", "Firm has ₹2 current assets for every ₹1 current liability", "Firm is insolvent", "Dividend payout is 2x"], answer: 1, explanation: "Current Ratio of 2 indicates strong short-term liquidity — ₹2 of liquid assets per ₹1 of near-term obligations." },
  { id: 84, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Quick Ratio excludes which item from current assets?", options: ["Cash", "Receivables", "Inventory", "Short-term investments"], answer: 2, explanation: "Quick Ratio = (Current Assets − Inventory) / Current Liabilities. Inventory is excluded as it is less liquid." },
  { id: 85, topic: "Financial Statement Analysis", difficulty: "Hard", question: "Return on Equity (ROE) using DuPont decomposition = Net Margin × Asset Turnover × ?", options: ["Gross Margin", "Equity Multiplier (Leverage)", "P/E Ratio", "Dividend Payout"], answer: 1, explanation: "DuPont: ROE = Net Profit Margin × Total Asset Turnover × Financial Leverage (Assets/Equity)." },
  { id: 86, topic: "Financial Statement Analysis", difficulty: "Easy", question: "Gross Profit = Revenue − ?", options: ["Net Income", "Operating expenses", "COGS", "Interest"], answer: 2, explanation: "Gross Profit = Revenue − Cost of Goods Sold. It measures production efficiency before overhead." },
  { id: 87, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Debt-to-Equity ratio of 1.5 means:", options: ["Equity is 1.5× debt", "Debt is 1.5× equity", "Firm is debt-free", "ROE = 1.5%"], answer: 1, explanation: "D/E = 1.5 means for every ₹1 of equity, the firm has ₹1.5 of debt — moderately leveraged." },
  { id: 88, topic: "Financial Statement Analysis", difficulty: "Hard", question: "Interest Coverage Ratio = EBIT / Interest Expense. A ratio of 1.5 signals:", options: ["Strong coverage", "Adequate but thin margin of safety", "No debt concerns", "Extremely safe"], answer: 1, explanation: "ICR of 1.5 means EBIT is just 1.5× interest — acceptable but leaves little room for earnings decline." },
  { id: 89, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Inventory Turnover = COGS / Average Inventory. A high ratio indicates:", options: ["Excess inventory", "Efficient inventory management", "Slow collections", "Poor liquidity"], answer: 1, explanation: "High inventory turnover means stock is being sold quickly — sign of efficient operations and strong demand." },
  { id: 90, topic: "Financial Statement Analysis", difficulty: "Easy", question: "Operating Cash Flow is found in which section of the Cash Flow Statement?", options: ["Investing activities", "Financing activities", "Operating activities", "Supplementary section"], answer: 2, explanation: "CFO (Cash from Operations) is the first and most important section, reflecting core business cash generation." },
  { id: 91, topic: "Financial Statement Analysis", difficulty: "Hard", question: "Common-size income statement expresses each line item as a percentage of:", options: ["Total assets", "Net income", "Revenue", "Gross profit"], answer: 2, explanation: "In a common-size income statement, all items are shown as % of revenue, enabling cross-company comparison." },
  { id: 92, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Days Sales Outstanding (DSO) = (Accounts Receivable / Revenue) × ?", options: ["30", "90", "365", "12"], answer: 2, explanation: "DSO = (AR / Revenue) × 365. It measures average days to collect receivables." },
  { id: 93, topic: "Financial Statement Analysis", difficulty: "Easy", question: "A company with negative working capital:", options: ["Always insolvent", "Has current liabilities exceeding current assets", "Has more cash than debt", "Is highly profitable"], answer: 1, explanation: "Negative working capital = Current Liabilities > Current Assets, which can signal liquidity stress (though some businesses operate healthily this way, e.g., retail)." },
  { id: 94, topic: "Financial Statement Analysis", difficulty: "Hard", question: "Under IFRS (IAS 2), which inventory valuation method is NOT permitted?", options: ["FIFO", "Weighted Average Cost", "LIFO", "Retail inventory method"], answer: 2, explanation: "IFRS prohibits LIFO (Last In First Out). IAS 2 permits FIFO, Weighted Average, and Retail Method. LIFO is allowed under US GAAP but banned under IFRS." },
  { id: 95, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Asset Turnover Ratio measures:", options: ["Profitability per unit of asset", "Revenue generated per rupee of assets", "Return on equity", "Working capital efficiency"], answer: 1, explanation: "Asset Turnover = Revenue / Total Assets. Higher ratio = more efficient use of assets to generate sales." },
  { id: 96, topic: "Financial Statement Analysis", difficulty: "Easy", question: "Retained Earnings on the balance sheet represents:", options: ["Cash available for dividends", "Cumulative profits not distributed as dividends", "Loans taken", "Market capitalization"], answer: 1, explanation: "Retained Earnings = accumulated net income kept in the business after paying dividends over all periods." },
  { id: 97, topic: "Financial Statement Analysis", difficulty: "Hard", question: "Altman Z-Score is used to predict:", options: ["Stock returns", "Credit rating upgrades", "Probability of corporate bankruptcy", "Dividend growth"], answer: 2, explanation: "Altman Z-Score uses five financial ratios to estimate the probability of bankruptcy within two years." },
  { id: 98, topic: "Financial Statement Analysis", difficulty: "Medium", question: "Net Profit Margin = Net Income / ?", options: ["EBITDA", "Total Assets", "Revenue", "Equity"], answer: 2, explanation: "Net Profit Margin = Net Income / Revenue × 100. It measures how much of each sales rupee becomes profit." },
  { id: 99, topic: "Financial Statement Analysis", difficulty: "Easy", question: "Operating Leverage measures sensitivity of EBIT to changes in:", options: ["Interest rates", "Tax rates", "Sales revenue", "Equity"], answer: 2, explanation: "Operating Leverage = % change in EBIT / % change in Sales. High fixed costs amplify EBIT swings." },
  { id: 100, topic: "Financial Statement Analysis", difficulty: "Hard", question: "Cash Conversion Cycle (CCC) = DSO + DIO − ?", options: ["DSO", "DPO (Days Payable Outstanding)", "COGS", "Gross margin days"], answer: 1, explanation: "CCC = DSO + DIO − DPO. Lower CCC means the firm converts investments into cash faster." },

  // ── DERIVATIVES (20) ──────────────────────────────────────────────────────
  { id: 101, topic: "Derivatives", difficulty: "Easy", question: "A Call Option gives the buyer the right to:", options: ["Sell at strike price", "Buy at strike price", "Receive dividends", "Short the stock"], answer: 1, explanation: "A call option gives the holder the right (not obligation) to BUY the underlying at the strike price." },
  { id: 102, topic: "Derivatives", difficulty: "Easy", question: "Put-Call Parity states:", options: ["Call + Strike PV = Put + Stock", "Put = Call always", "Call = Stock price", "Put = Dividend yield"], answer: 0, explanation: "Put-Call Parity: C + PV(K) = P + S₀. This ensures no-arbitrage between options and underlying." },
  { id: 103, topic: "Derivatives", difficulty: "Medium", question: "Delta of an option measures:", options: ["Time decay", "Rate of change of option price with respect to stock price", "Volatility sensitivity", "Interest rate sensitivity"], answer: 1, explanation: "Delta = ∂Option Price / ∂Stock Price. Call delta ranges from 0 to 1; put delta from −1 to 0." },
  { id: 104, topic: "Derivatives", difficulty: "Medium", question: "Theta in options refers to:", options: ["Sensitivity to volatility", "Time decay of option value", "Sensitivity to interest rate", "Price sensitivity"], answer: 1, explanation: "Theta measures how much an option loses in value per day as time passes — options are wasting assets." },
  { id: 105, topic: "Derivatives", difficulty: "Hard", question: "Black-Scholes model assumes:", options: ["Discrete price movements", "Constant volatility and no dividends", "American-style options", "Jumps in stock prices"], answer: 1, explanation: "B-S assumes: continuous trading, constant volatility, no dividends, log-normal distribution, European-style options." },
  { id: 106, topic: "Derivatives", difficulty: "Easy", question: "A futures contract obligates both parties to:", options: ["Exchange only on expiry optionally", "Buy/sell at a predetermined price on a future date", "Pay premium upfront", "Only the buyer to perform"], answer: 1, explanation: "Unlike options, futures are binding contracts — both buyer (long) and seller (short) must fulfill at expiry." },
  { id: 107, topic: "Derivatives", difficulty: "Medium", question: "Intrinsic value of a call option = max(S − K, 0). For S = 120, K = 100, intrinsic value is:", options: ["₹100", "₹20", "₹0", "₹120"], answer: 1, explanation: "Intrinsic value = max(120 − 100, 0) = max(20, 0) = ₹20." },
  { id: 108, topic: "Derivatives", difficulty: "Hard", question: "Vega measures option sensitivity to:", options: ["Stock price", "Interest rate", "Time", "Implied volatility"], answer: 3, explanation: "Vega = ∂Option Price / ∂Volatility. Higher vega means option price is more sensitive to volatility changes." },
  { id: 109, topic: "Derivatives", difficulty: "Medium", question: "An 'In the Money' put option means:", options: ["S > K", "S = K", "S < K", "S = 0"], answer: 2, explanation: "Put is ITM when stock price (S) < strike price (K) — it has positive intrinsic value to the holder." },
  { id: 110, topic: "Derivatives", difficulty: "Easy", question: "Hedging using derivatives is done to:", options: ["Maximize profits", "Reduce or eliminate financial risk", "Speculate on price movements", "Increase leverage"], answer: 1, explanation: "Hedging takes an offsetting position to reduce exposure to adverse price movements." },
  { id: 111, topic: "Derivatives", difficulty: "Hard", question: "A bull spread using calls is constructed by:", options: ["Buying a low strike call and selling a high strike call", "Buying two calls at same strike", "Selling a put and buying a call", "Buying a high strike call only"], answer: 0, explanation: "Bull call spread = Long lower strike call + Short higher strike call. Profits from moderate price rise, limits cost." },
  { id: 112, topic: "Derivatives", difficulty: "Medium", question: "Mark-to-Market (MTM) in futures means:", options: ["Profit booked only at expiry", "Daily settlement of gains/losses", "Margin deposited once", "No cash flows till expiry"], answer: 1, explanation: "Futures are marked to market daily — gains/losses are credited/debited to margin accounts each day." },
  { id: 113, topic: "Derivatives", difficulty: "Easy", question: "Option premium is the:", options: ["Strike price", "Market price of the option itself", "Intrinsic value only", "Time value only"], answer: 1, explanation: "Option premium = price paid by buyer to seller. Premium = Intrinsic Value + Time Value." },
  { id: 114, topic: "Derivatives", difficulty: "Hard", question: "Rho measures option sensitivity to:", options: ["Volatility", "Time decay", "Risk-free interest rate", "Dividend yield"], answer: 2, explanation: "Rho = ∂Option Price / ∂r. Call options have positive Rho; put options have negative Rho." },
  { id: 115, topic: "Derivatives", difficulty: "Medium", question: "A straddle strategy involves:", options: ["Buying call and put at same strike and expiry", "Buying call at different strikes", "Short selling futures", "Buying call and selling put"], answer: 0, explanation: "Long straddle = Buy call + Buy put (same strike, same expiry). Profits from large price movement in either direction." },
  { id: 116, topic: "Derivatives", difficulty: "Easy", question: "Open Interest in derivatives refers to:", options: ["Volume of trades yesterday", "Total outstanding contracts not yet settled", "Number of exchanges", "Daily turnover"], answer: 1, explanation: "Open Interest is the total number of active (unsettled) contracts in the market at any point." },
  { id: 117, topic: "Derivatives", difficulty: "Hard", question: "Gamma measures:", options: ["Rate of change of delta with respect to stock price", "Time decay", "Volatility sensitivity", "Interest sensitivity"], answer: 0, explanation: "Gamma = ∂Delta / ∂Stock Price. High gamma means delta changes rapidly — important for dynamic hedging." },
  { id: 118, topic: "Derivatives", difficulty: "Medium", question: "Basis in futures = ?", options: ["Spot price − Futures price", "Futures price − Strike price", "Open interest × lot size", "Premium × delta"], answer: 0, explanation: "Basis = Spot Price − Futures Price. At expiry, basis converges to zero (convergence property)." },
  { id: 119, topic: "Derivatives", difficulty: "Easy", question: "An interest rate swap exchanges:", options: ["Equity for bonds", "Fixed interest payments for floating rate payments", "Currency for commodities", "Dividends for coupons"], answer: 1, explanation: "In a vanilla interest rate swap, one party pays fixed rate while receiving floating (LIBOR/MIBOR-based) — or vice versa." },
  { id: 120, topic: "Derivatives", difficulty: "Hard", question: "Which pricing model is better suited for American options?", options: ["Black-Scholes", "Binomial model", "CAPM", "DDM"], answer: 1, explanation: "The Binomial model handles early exercise (American options) better than B-S, which is designed for European options." },

  // ── BONDS & FIXED INCOME (20) ──────────────────────────────────────────────
  { id: 121, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "When market interest rates rise, bond prices:", options: ["Rise", "Stay the same", "Fall", "Double"], answer: 2, explanation: "Bond prices and yields move inversely — when rates rise, existing bonds with lower coupons become less attractive, so prices fall." },
  { id: 122, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "Yield to Maturity (YTM) is:", options: ["Annual coupon / face value", "Total return if bond held to maturity", "Current price / face value", "Coupon rate only"], answer: 1, explanation: "YTM is the IRR of all bond cash flows (coupons + principal at par) — represents total return if held to maturity." },
  { id: 123, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "Duration of a bond measures:", options: ["Time to first coupon", "Weighted average time to receive cash flows (price sensitivity to rates)", "Maturity only", "Coupon frequency"], answer: 1, explanation: "Macaulay Duration = weighted average time of cash flows. Modified Duration = price sensitivity to yield changes." },
  { id: 124, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "A zero-coupon bond priced at ₹700 with face value ₹1,000, maturing in 5 years has YTM of approximately:", options: ["7.39%", "5.0%", "8.0%", "6.5%"], answer: 0, explanation: "YTM = (1000/700)^(1/5) − 1 = (1.4286)^0.2 − 1 ≈ 7.39%" },
  { id: 125, topic: "Bonds & Fixed Income", difficulty: "Hard", question: "Convexity in bonds benefits the holder because:", options: ["When yields rise, price falls less than duration predicts; when yields fall, price rises more — actual price always exceeds duration estimate", "Duration overestimates price in all scenarios", "Price change is perfectly linear with yield", "Duration is zero for convex bonds"], answer: 0, explanation: "Convexity adds a second-order correction to duration. When yields rise, actual price loss < duration prediction. When yields fall, actual price gain > duration prediction. Positive convexity always benefits the bondholder." },
  { id: 126, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "A bond trading above par (face value) is called:", options: ["Discount bond", "Par bond", "Premium bond", "Zero bond"], answer: 2, explanation: "When price > face value, the bond trades at a premium — typically when coupon rate > market yield." },
  { id: 127, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "Callable bonds have higher yields than non-callable bonds because:", options: ["They are riskier for issuer", "Call risk benefits the issuer, requiring extra yield compensation to investors", "They have longer duration", "They pay no coupons"], answer: 1, explanation: "Callable bonds can be redeemed early by the issuer (usually when rates fall), creating reinvestment risk for investors." },
  { id: 128, topic: "Bonds & Fixed Income", difficulty: "Hard", question: "Credit Default Swap (CDS) is a contract where the protection buyer:", options: ["Pays fixed premium and receives par on default of reference entity", "Receives fixed premium only", "Buys the bond cheaply", "Exchanges currencies"], answer: 0, explanation: "In a CDS, the buyer pays periodic premiums; if the reference entity defaults, the seller pays the loss (par − recovery)." },
  { id: 129, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "Yield curve inversion (short rates > long rates) historically signals:", options: ["Economic expansion", "Potential recession", "Stable inflation", "Rate cuts won't happen"], answer: 1, explanation: "An inverted yield curve (2Y > 10Y) has historically preceded recessions as it signals market expectations of future rate cuts." },
  { id: 130, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "Coupon rate of a bond is determined at:", options: ["Current market rate", "Issuance (fixed for the bond's life)", "Every reset date", "RBI auction"], answer: 1, explanation: "The coupon rate is fixed at issuance for fixed-rate bonds. It doesn't change regardless of market rate movements." },
  { id: 131, topic: "Bonds & Fixed Income", difficulty: "Hard", question: "Modified Duration formula is:", options: ["Macaulay Duration / (1 + YTM)", "Macaulay Duration × (1 + YTM)", "1 / Macaulay Duration", "YTM / Duration"], answer: 0, explanation: "Modified Duration = Macaulay Duration / (1 + YTM/m). It directly estimates % price change per 1% yield change." },
  { id: 132, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "Accrued interest on a bond is:", options: ["Next coupon payment", "Interest earned since last coupon date", "YTM adjustment", "Premium over par"], answer: 1, explanation: "Accrued interest is the portion of the next coupon earned by the seller for days held — paid by buyer at settlement." },
  { id: 133, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "G-Secs (Government Securities) in India are issued by:", options: ["RBI on behalf of Government of India", "SEBI", "NSE", "Commercial banks"], answer: 0, explanation: "RBI manages the issuance of Government Securities (G-Secs) on behalf of the Government of India." },
  { id: 134, topic: "Bonds & Fixed Income", difficulty: "Hard", question: "Spread duration measures sensitivity of a bond's price to changes in:", options: ["Government yields", "Credit spread (OAS)", "Coupon rate", "Duration itself"], answer: 1, explanation: "Spread duration estimates price sensitivity to changes in credit/OAS spread, distinct from rate duration." },
  { id: 135, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "Floating rate bonds reduce which risk for investors?", options: ["Credit risk", "Liquidity risk", "Interest rate risk", "Currency risk"], answer: 2, explanation: "Floating rate bonds reset coupons periodically (tied to benchmark like MIBOR), reducing interest rate risk." },
  { id: 136, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "A bond with higher duration has:", options: ["Less interest rate sensitivity", "More interest rate sensitivity", "No price change with rate moves", "Lower coupon"], answer: 1, explanation: "Higher duration = greater price sensitivity to interest rate changes — the bond's price will swing more." },
  { id: 137, topic: "Bonds & Fixed Income", difficulty: "Hard", question: "Option-Adjusted Spread (OAS) removes the impact of:", options: ["Credit risk", "Embedded options (call/put) from the spread", "Duration", "Liquidity premium"], answer: 1, explanation: "OAS strips out the value of embedded options to isolate the pure credit/liquidity spread over the benchmark." },
  { id: 138, topic: "Bonds & Fixed Income", difficulty: "Medium", question: "For a bond trading at a discount, YTM is:", options: ["Less than coupon rate", "Equal to coupon rate", "Greater than coupon rate", "Zero"], answer: 2, explanation: "Discount bond: Price < Par means investors require more return than the coupon provides → YTM > Coupon Rate." },
  { id: 139, topic: "Bonds & Fixed Income", difficulty: "Easy", question: "Clean price of a bond is:", options: ["Price including accrued interest", "Price excluding accrued interest", "Face value", "Price at par"], answer: 1, explanation: "Clean price excludes accrued interest. Dirty (full) price = Clean price + Accrued interest." },
  { id: 140, topic: "Bonds & Fixed Income", difficulty: "Hard", question: "The Expectations Theory of the yield curve states:", options: ["Long-term rates = expected future short-term rates", "Long rates are always higher than short rates", "Yields don't change with maturity", "Short rates predict inflation only"], answer: 0, explanation: "Pure Expectations Theory: long-term yields are geometric averages of expected future short-term rates, with no term premium." },

  // ── PORTFOLIO THEORY & RISK (20) ───────────────────────────────────────────
  { id: 141, topic: "Portfolio Theory & Risk", difficulty: "Easy", question: "Diversification reduces which type of risk?", options: ["Systematic risk", "Market risk", "Unsystematic (firm-specific) risk", "Interest rate risk"], answer: 2, explanation: "Diversification eliminates unsystematic/idiosyncratic risk. Systematic (market) risk cannot be diversified away." },
  { id: 142, topic: "Portfolio Theory & Risk", difficulty: "Easy", question: "Standard deviation in portfolio theory measures:", options: ["Return", "Total risk (volatility)", "Beta", "Correlation"], answer: 1, explanation: "Standard deviation measures the dispersion of returns — a proxy for total risk of an investment." },
  { id: 143, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Correlation coefficient of −1 between two assets means:", options: ["Perfect positive correlation", "No relationship", "Perfect negative correlation (maximum diversification benefit)", "Returns are equal"], answer: 2, explanation: "ρ = −1 means assets move in exactly opposite directions — combining them can eliminate portfolio risk entirely." },
  { id: 144, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Capital Market Line (CML) represents:", options: ["Risk-return combinations using only risky assets", "Efficient portfolios combining risk-free asset and market portfolio", "Individual security risk-return", "Debt financing line"], answer: 1, explanation: "CML plots optimal portfolios (market portfolio + risk-free asset). Points above CML are unattainable; below are inefficient." },
  { id: 145, topic: "Portfolio Theory & Risk", difficulty: "Hard", question: "Security Market Line (SML) plots expected return against:", options: ["Standard deviation", "Beta (systematic risk)", "Correlation", "Variance"], answer: 1, explanation: "SML uses beta (systematic risk) on X-axis. SML is the graphical representation of CAPM." },
  { id: 146, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Sharpe Ratio = (Portfolio Return − Risk-free Rate) / ?", options: ["Beta", "Standard deviation of portfolio", "Variance", "Correlation"], answer: 1, explanation: "Sharpe Ratio measures excess return per unit of total risk (standard deviation). Higher = better risk-adjusted return." },
  { id: 147, topic: "Portfolio Theory & Risk", difficulty: "Hard", question: "Treynor Ratio differs from Sharpe Ratio in that it uses:", options: ["Standard deviation", "Total risk", "Beta (systematic risk) in denominator", "Alpha"], answer: 2, explanation: "Treynor Ratio = Excess Return / Beta. It measures return per unit of systematic risk (useful for well-diversified portfolios)." },
  { id: 148, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Jensen's Alpha measures:", options: ["Total return above benchmark", "Excess return above CAPM-predicted return", "Risk-adjusted sharpe", "Portfolio beta"], answer: 1, explanation: "Jensen's Alpha = Actual Return − CAPM Expected Return. Positive alpha = manager added value beyond systematic risk." },
  { id: 149, topic: "Portfolio Theory & Risk", difficulty: "Easy", question: "Efficient Frontier represents portfolios that:", options: ["Have maximum risk", "Offer maximum return for a given level of risk", "Are all equally risky", "Only use government bonds"], answer: 1, explanation: "Efficient Frontier (Markowitz) consists of portfolios with the highest expected return for each level of portfolio risk." },
  { id: 150, topic: "Portfolio Theory & Risk", difficulty: "Hard", question: "Value at Risk (VaR) at 95% confidence level means:", options: ["Maximum possible loss", "Loss will not exceed VaR amount 95% of time", "Loss exceeded 95% of days", "Average daily loss"], answer: 1, explanation: "95% VaR = maximum loss not exceeded in 95% of scenarios. There is 5% probability losses will be worse than VaR." },
  { id: 151, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "If two stocks have correlation = 1, the portfolio standard deviation equals:", options: ["Weighted average of individual standard deviations", "Zero", "Less than weighted average", "Greater than either stock alone"], answer: 0, explanation: "When ρ = 1, there is no diversification benefit — portfolio SD = weighted average of individual SDs." },
  { id: 152, topic: "Portfolio Theory & Risk", difficulty: "Easy", question: "Beta of the market portfolio is:", options: ["0", "0.5", "1", "2"], answer: 2, explanation: "By definition, the market portfolio has Beta = 1. All other assets are measured relative to this benchmark." },
  { id: 153, topic: "Portfolio Theory & Risk", difficulty: "Hard", question: "Arbitrage Pricing Theory (APT) differs from CAPM by:", options: ["Using single factor", "Using multiple macroeconomic factors", "Ignoring risk", "Using dividend yield as factor"], answer: 1, explanation: "APT is a multi-factor model (GDP growth, inflation, interest rates, etc.). CAPM uses only the single market factor." },
  { id: 154, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Covariance between two assets = ρ × σ₁ × ?", options: ["σ₁", "σ₂", "β", "Rf"], answer: 1, explanation: "Cov(1,2) = ρ₁₂ × σ₁ × σ₂. Positive covariance means assets tend to move together." },
  { id: 155, topic: "Portfolio Theory & Risk", difficulty: "Easy", question: "A defensive stock has Beta:", options: ["Greater than 1", "Equal to 1", "Less than 1", "Negative always"], answer: 2, explanation: "Defensive stocks (utilities, FMCG) have Beta < 1 — they move less than the market in both up and down cycles." },
  { id: 156, topic: "Portfolio Theory & Risk", difficulty: "Hard", question: "Information Ratio = Alpha / ?", options: ["Beta", "Standard deviation of alpha (tracking error)", "Sharpe ratio", "Market return"], answer: 1, explanation: "Information Ratio = Alpha / Tracking Error. It measures the consistency of outperformance relative to a benchmark." },
  { id: 157, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Which risk cannot be reduced by adding more assets to a portfolio?", options: ["Unsystematic risk", "Business risk", "Default risk", "Systematic risk"], answer: 3, explanation: "Systematic risk (market risk, macroeconomic risk) affects all assets simultaneously and cannot be diversified away." },
  { id: 158, topic: "Portfolio Theory & Risk", difficulty: "Easy", question: "Optimal risky portfolio lies at the point where:", options: ["Risk is minimum", "CML is tangent to Efficient Frontier", "Beta = 1", "Return is maximum"], answer: 1, explanation: "The optimal risky portfolio (market portfolio) is the tangency point of CML with the Efficient Frontier." },
  { id: 159, topic: "Portfolio Theory & Risk", difficulty: "Hard", question: "Conditional VaR (CVaR) is also known as:", options: ["Delta VaR", "Expected Shortfall (ES)", "Stressed VaR", "Marginal VaR"], answer: 1, explanation: "CVaR (Expected Shortfall) = average loss conditional on losses exceeding VaR threshold. More conservative than VaR." },
  { id: 160, topic: "Portfolio Theory & Risk", difficulty: "Medium", question: "Market risk premium is the additional return investors demand for:", options: ["Holding riskless assets", "Holding a diversified market portfolio over the risk-free rate", "Investing in bonds", "Currency risk"], answer: 1, explanation: "Market risk premium = E(Rm) − Rf. It compensates investors for bearing undiversifiable market risk." },

  // ── CORPORATE FINANCE (20) ────────────────────────────────────────────────
  { id: 161, topic: "Corporate Finance", difficulty: "Easy", question: "Modigliani-Miller Theorem (without taxes) states that firm value is:", options: ["Maximized with all-debt financing", "Independent of capital structure", "Maximized with all-equity", "Determined by dividend policy"], answer: 1, explanation: "M&M Proposition I (no taxes): In perfect markets, firm value is independent of capital structure." },
  { id: 162, topic: "Corporate Finance", difficulty: "Medium", question: "Agency problem in corporate finance refers to conflict between:", options: ["Customers and suppliers", "Shareholders (principals) and managers (agents)", "Debtors and creditors", "Government and firms"], answer: 1, explanation: "Agency problem arises when managers (agents) act in self-interest rather than maximizing shareholder (principal) wealth." },
  { id: 163, topic: "Corporate Finance", difficulty: "Hard", question: "Pecking Order Theory suggests firms prefer financing in this order:", options: ["Equity → Debt → Internal funds", "Internal funds → Debt → Equity", "Debt → Equity → Internal funds", "All are equally preferred"], answer: 1, explanation: "Pecking Order (Myers): firms prefer internal funds first, then debt, then equity last (due to information asymmetry)." },
  { id: 164, topic: "Corporate Finance", difficulty: "Medium", question: "A stock buyback is preferred over dividends when:", options: ["Firm has excess cash always", "Management believes stock is undervalued and wants to signal this", "Dividends are tax-exempt", "Regulations require it"], answer: 1, explanation: "Buybacks signal undervaluation, offer flexibility (not a recurring commitment), and may be tax-efficient vs. dividends." },
  { id: 165, topic: "Corporate Finance", difficulty: "Easy", question: "Leverage in corporate finance refers to:", options: ["Use of technology", "Use of debt to amplify returns", "Diversification", "Working capital management"], answer: 1, explanation: "Financial leverage = using debt financing. It amplifies both returns (when positive) and losses (when negative)." },
  { id: 166, topic: "Corporate Finance", difficulty: "Hard", question: "Trade-off Theory of capital structure balances:", options: ["Risk vs return", "Tax benefits of debt vs financial distress costs", "Dividends vs buybacks", "Equity vs retained earnings"], answer: 1, explanation: "Trade-off Theory: optimal D/E is where marginal tax benefit of additional debt = marginal cost of financial distress." },
  { id: 167, topic: "Corporate Finance", difficulty: "Medium", question: "Economic Value Added (EVA) = NOPAT − ?", options: ["Revenue", "Capital Employed × WACC", "Tax", "Interest"], answer: 1, explanation: "EVA = NOPAT − (Capital Employed × WACC). Positive EVA means the firm earns above its cost of capital." },
  { id: 168, topic: "Corporate Finance", difficulty: "Easy", question: "Dividend irrelevance theory (M&M) states dividends:", options: ["Always increase stock price", "Have no effect on firm value in perfect markets", "Should always be paid", "Reduce WACC"], answer: 1, explanation: "M&M Dividend Irrelevance: in perfect markets, dividend policy doesn't affect firm value — investors can create homemade dividends." },
  { id: 169, topic: "Corporate Finance", difficulty: "Hard", question: "Rights issue allows existing shareholders to buy new shares:", options: ["At market price", "At a discount to market price (to make it attractive)", "At face value only", "At book value"], answer: 1, explanation: "Rights are issued at a discount to market price to incentivize participation; TERP (theoretical ex-rights price) adjusts accordingly." },
  { id: 170, topic: "Corporate Finance", difficulty: "Medium", question: "Free Cash Flow to Firm (FCFF) is calculated as:", options: ["Net Income + D&A", "EBIT(1-T) + D&A − CAPEX − ΔNWC", "Revenue − COGS", "EBITDA only"], answer: 1, explanation: "FCFF = NOPAT + D&A − CAPEX − Change in Net Working Capital — cash available to all capital providers." },
  { id: 171, topic: "Corporate Finance", difficulty: "Easy", question: "Optimal capital structure minimizes:", options: ["Revenues", "WACC", "Return on Equity", "Gross profit"], answer: 1, explanation: "The optimal capital structure is the D/E mix that minimizes WACC, thereby maximizing firm value." },
  { id: 172, topic: "Corporate Finance", difficulty: "Hard", question: "LBO (Leveraged Buyout) involves:", options: ["Acquiring a company using primarily equity", "Acquiring a company using significant debt secured by target's assets", "Issuing bonds for dividend payment", "Selling assets to reduce debt"], answer: 1, explanation: "LBO = acquisition funded mostly with debt (60–90%). Target's own assets/cash flows typically secure the debt." },
  { id: 173, topic: "Corporate Finance", difficulty: "Medium", question: "Financial distress costs include:", options: ["Tax savings from interest", "Loss of customers/suppliers, legal/restructuring costs, management distraction", "Dividend payments", "CAPEX increases"], answer: 1, explanation: "Direct: legal, restructuring fees. Indirect: lost customers, key employee exits, reduced access to capital — all reduce firm value." },
  { id: 174, topic: "Corporate Finance", difficulty: "Easy", question: "Market Capitalization = Share Price × ?", options: ["Total assets", "Book value", "Number of shares outstanding", "EPS"], answer: 2, explanation: "Market Cap = Share Price × Total Shares Outstanding. It reflects the market's total equity value of the company." },
  { id: 175, topic: "Corporate Finance", difficulty: "Hard", question: "Synergy in M&A refers to:", options: ["Increase in combined firm value beyond sum of individual values", "Cost of acquisition", "Goodwill amortization", "Post-merger debt reduction"], answer: 0, explanation: "Synergy = '2+2=5' — combined entity is worth more due to revenue synergies, cost savings, or tax benefits." },
  { id: 176, topic: "Corporate Finance", difficulty: "Medium", question: "Earnings per Share (EPS) = Net Income / ?", options: ["Total assets", "Market cap", "Weighted average shares outstanding", "Revenue"], answer: 2, explanation: "EPS = Net Income (attributable to equity) / Weighted Average Diluted Shares Outstanding." },
  { id: 177, topic: "Corporate Finance", difficulty: "Easy", question: "Break-even analysis finds the output level where:", options: ["Revenue = EBITDA", "Total Revenue = Total Cost (zero profit)", "NPV = 0", "Dividends = EPS"], answer: 1, explanation: "Break-even point is where Total Revenue = Total Costs (Fixed + Variable). Below = loss; above = profit." },
  { id: 178, topic: "Corporate Finance", difficulty: "Hard", question: "Dividend Signaling Theory suggests that:", options: ["High dividends always reduce value", "Dividend increases signal management's confidence in future earnings", "Dividends are irrelevant always", "Buybacks signal negative news"], answer: 1, explanation: "Signaling Theory (Bhattacharya): dividend changes convey private information — a raise signals strong future prospects." },
  { id: 179, topic: "Corporate Finance", difficulty: "Medium", question: "ROIC (Return on Invested Capital) > WACC means the firm is:", options: ["Destroying value", "Creating economic value", "Breaking even", "Overly leveraged"], answer: 1, explanation: "When ROIC > WACC, the firm earns more than its cost of capital — it's creating shareholder value (positive EVA)." },
  { id: 180, topic: "Corporate Finance", difficulty: "Easy", question: "Working capital = Current Assets − ?", options: ["Total liabilities", "Fixed assets", "Current liabilities", "Long-term debt"], answer: 2, explanation: "Net Working Capital = Current Assets − Current Liabilities. Positive NWC means the firm can cover short-term obligations." },

  // ── MACRO & MARKETS (20) ──────────────────────────────────────────────────
  { id: 181, topic: "Macro & Markets", difficulty: "Easy", question: "Repo Rate is the rate at which RBI:", options: ["Lends to commercial banks against securities", "Borrows from commercial banks", "Sets inflation target", "Fixes exchange rates"], answer: 0, explanation: "Repo Rate = rate at which RBI lends short-term funds to commercial banks. An increase tightens liquidity." },
  { id: 182, topic: "Macro & Markets", difficulty: "Easy", question: "GDP measures:", options: ["Money supply in economy", "Total market value of goods/services produced in a country in a period", "Government revenue", "Foreign trade balance"], answer: 1, explanation: "GDP = total monetary value of all final goods and services produced within a country in a given time period." },
  { id: 183, topic: "Macro & Markets", difficulty: "Medium", question: "Fiscal deficit = Government Expenditure − ?", options: ["Total tax revenue", "Total revenue receipts (including non-debt capital receipts)", "GDP", "Foreign reserves"], answer: 1, explanation: "Fiscal Deficit = Total Expenditure − Total Revenue Receipts (excluding borrowings). Indicates government borrowing need." },
  { id: 184, topic: "Macro & Markets", difficulty: "Medium", question: "Inflation erodes the value of which type of investment most?", options: ["Equities", "Real assets (gold, property)", "Fixed-income bonds", "Commodities"], answer: 2, explanation: "Fixed-income instruments suffer most from inflation as purchasing power of fixed cash flows declines with rising prices." },
  { id: 185, topic: "Macro & Markets", difficulty: "Hard", question: "Quantitative Easing (QE) involves the central bank:", options: ["Raising interest rates", "Purchasing long-term securities to inject liquidity", "Raising reserve requirements", "Reducing money supply"], answer: 1, explanation: "QE = central bank buys government bonds/securities in open market, injecting reserves and reducing long-term yields." },
  { id: 186, topic: "Macro & Markets", difficulty: "Easy", question: "Bull market is characterized by:", options: ["Falling prices over extended period", "Rising prices and investor optimism", "High volatility only", "Bearish sentiment"], answer: 1, explanation: "A bull market = sustained rise in asset prices (typically 20%+ from trough), driven by economic optimism." },
  { id: 187, topic: "Macro & Markets", difficulty: "Medium", question: "Current Account deficit means a country:", options: ["Has more exports than imports", "Imports more goods/services than it exports (net)", "Has surplus foreign reserves", "Has high FDI inflows"], answer: 1, explanation: "CAD = imports of goods, services, and income > exports. Must be financed by capital/financial account inflows." },
  { id: 188, topic: "Macro & Markets", difficulty: "Hard", question: "Phillips Curve shows the relationship between:", options: ["GDP and inflation", "Inflation and unemployment (inverse)", "Interest rates and bond prices", "Fiscal deficit and GDP"], answer: 1, explanation: "Traditional Phillips Curve: inverse relationship between inflation and unemployment. Lower unemployment → higher inflation." },
  { id: 189, topic: "Macro & Markets", difficulty: "Medium", question: "SENSEX tracks the performance of how many companies on BSE?", options: ["50", "100", "30", "500"], answer: 2, explanation: "SENSEX (S&P BSE Sensex) is a free-float market-cap weighted index of 30 large-cap companies listed on BSE." },
  { id: 190, topic: "Macro & Markets", difficulty: "Easy", question: "Foreign Exchange Reserve is maintained by:", options: ["Commercial banks", "NSE", "RBI", "SEBI"], answer: 2, explanation: "RBI manages India's foreign exchange reserves to support the rupee and meet external payment obligations." },
  { id: 191, topic: "Macro & Markets", difficulty: "Hard", question: "Stagflation is characterized by:", options: ["High growth, low inflation", "Stagnant growth + high inflation simultaneously", "Deflation + high growth", "Low growth + low inflation"], answer: 1, explanation: "Stagflation = simultaneous high inflation AND stagnant/negative growth + high unemployment — difficult to treat with traditional tools." },
  { id: 192, topic: "Macro & Markets", difficulty: "Medium", question: "SEBI's primary role in Indian financial markets is:", options: ["Setting interest rates", "Regulating securities markets to protect investors", "Printing currency", "Managing forex reserves"], answer: 1, explanation: "SEBI (Securities and Exchange Board of India) regulates and develops the securities market and protects investor interests." },
  { id: 193, topic: "Macro & Markets", difficulty: "Easy", question: "Circuit breaker in stock markets is triggered to:", options: ["Boost trading volumes", "Halt trading temporarily during extreme price movements", "Increase liquidity", "Allow FII activity"], answer: 1, explanation: "Circuit breakers pause trading when indices fall/rise beyond specified thresholds, preventing panic-driven crashes." },
  { id: 194, topic: "Macro & Markets", difficulty: "Hard", question: "Purchasing Power Parity (PPP) theory states exchange rates adjust so that:", options: ["Interest rates equalize", "Identical goods cost the same in different countries", "Trade deficits are zero", "GDP per capita equalizes"], answer: 1, explanation: "PPP: exchange rates should converge to eliminate price differences for identical goods across countries (law of one price)." },
  { id: 195, topic: "Macro & Markets", difficulty: "Medium", question: "NIFTY 50 is a benchmark index of NSE consisting of:", options: ["50 midcap stocks", "50 large-cap stocks across 13 sectors", "30 stocks like SENSEX", "Top 50 government bonds"], answer: 1, explanation: "NIFTY 50 represents 50 of India's largest, most liquid companies across 13 sectors, covering ~65% of free-float market cap." },
  { id: 196, topic: "Macro & Markets", difficulty: "Easy", question: "FII (Foreign Institutional Investor) inflows into India generally cause the rupee to:", options: ["Depreciate", "Appreciate", "Stay constant", "Become volatile only"], answer: 1, explanation: "FII inflows bring foreign currency (USD) that is converted to INR, increasing demand for rupee → rupee appreciates." },
  { id: 197, topic: "Macro & Markets", difficulty: "Hard", question: "Yield curve steepening typically occurs when:", options: ["Short rates rise faster than long rates", "Long rates rise faster than short rates (or short rates fall)", "All yields fall equally", "Inflation is zero"], answer: 1, explanation: "Steepening = widening spread between long-term and short-term yields, typically in economic recovery as growth expectations rise." },
  { id: 198, topic: "Macro & Markets", difficulty: "Medium", question: "Commodity prices and the US Dollar Index (DXY) typically have a:", options: ["Strong positive correlation", "Inverse relationship", "No relationship", "Identical movement"], answer: 1, explanation: "Most commodities are priced in USD. A stronger dollar makes commodities expensive for foreign buyers → prices fall." },
  { id: 199, topic: "Macro & Markets", difficulty: "Easy", question: "IPO stands for:", options: ["International Portfolio Offering", "Initial Public Offering", "Interest Payment Option", "Indexed Price Order"], answer: 1, explanation: "IPO = Initial Public Offering. A private company offers shares to the public for the first time to raise capital." },
  { id: 200, topic: "Macro & Markets", difficulty: "Hard", question: "Carry trade in forex involves:", options: ["Buying and selling same currency simultaneously", "Borrowing in low-interest currency and investing in high-interest currency", "Hedging currency risk with forwards", "Exchanging gold for currency"], answer: 1, explanation: "Carry trade: borrow cheap (e.g., JPY at 0.5%) → invest in high-yield currency (e.g., INR at 6.5%). Profits from interest differential but carries exchange rate risk." },
];

const TOPICS = ["All Topics", ...Array.from(new Set(ALL_QUESTIONS.map(q => q.topic)))];
const DIFFICULTIES = ["All Levels", "Easy", "Medium", "Hard"];

const TOPIC_META = {
  "Time Value of Money":         { color: "#2E7D32", light: "#E8F5E9", icon: "⏳" },
  "Capital Budgeting":           { color: "#BF6F00", light: "#FFF8E1", icon: "📊" },
  "WACC & Cost of Capital":      { color: "#AD1457", light: "#FCE4EC", icon: "⚖️" },
  "Equity Valuation":            { color: "#1565C0", light: "#E3F2FD", icon: "📈" },
  "Financial Statement Analysis":{ color: "#4527A0", light: "#EDE7F6", icon: "🧾" },
  "Derivatives":                 { color: "#00695C", light: "#E0F2F1", icon: "🔄" },
  "Bonds & Fixed Income":        { color: "#283593", light: "#E8EAF6", icon: "🏦" },
  "Portfolio Theory & Risk":     { color: "#E65100", light: "#FBE9E7", icon: "🎯" },
  "Corporate Finance":           { color: "#6A1B9A", light: "#F3E5F5", icon: "🏢" },
  "Macro & Markets":             { color: "#00838F", light: "#E0F7FA", icon: "🌐" },
};

const DIFF_META = {
  Easy:   { color: "#2E7D32", bg: "#E8F5E9", border: "#A5D6A7", label: "🌱 Easy" },
  Medium: { color: "#BF6F00", bg: "#FFF8E1", border: "#FFD54F", label: "🔥 Medium" },
  Hard:   { color: "#B71C1C", bg: "#FFEBEE", border: "#EF9A9A", label: "💎 Hard" },
};

const TOPIC_COLORS = Object.fromEntries(Object.entries(TOPIC_META).map(([k,v]) => [k, v.color]));

const MOTIVATIONAL = [
  "You've got this! 💪", "Think it through!", "Trust the process 📚",
  "Every CFA starts here 🎓", "Finance pro in the making!", "Stay sharp! 🧠",
  "Channel your inner Warren Buffett 📰", "Almost there, keep going!",
];

export default function FinanceMCQBank() {
  const [screen, setScreen] = useState("home");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedDiff, setSelectedDiff] = useState("All Levels");
  const [quizCount, setQuizCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExpl, setShowExpl] = useState(false);
  const [time, setTime] = useState(0);
  const [quizTime, setQuizTime] = useState(0);
  const timerRef = useRef(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [motivIdx] = useState(() => Math.floor(Math.random() * MOTIVATIONAL.length));

  useEffect(() => {
    if (screen === "quiz" && !reviewMode) {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, reviewMode]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const startQuiz = () => {
    let pool = ALL_QUESTIONS;
    if (selectedTopic !== "All Topics") pool = pool.filter(q => q.topic === selectedTopic);
    if (selectedDiff !== "All Levels") pool = pool.filter(q => q.difficulty === selectedDiff);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(quizCount, pool.length));
    setQuestions(shuffled);
    setCurrent(0); setChosen(null); setAnswers([]); setShowExpl(false); setTime(0); setReviewMode(false);
    setScreen("quiz");
  };

  const handleOption = (idx) => { if (chosen !== null) return; setChosen(idx); setShowExpl(true); };

  const next = () => {
    const newAnswers = [...answers, { question: questions[current], chosen, correct: chosen === questions[current].answer }];
    if (current + 1 >= questions.length) { setAnswers(newAnswers); setQuizTime(time); setScreen("result"); }
    else { setAnswers(newAnswers); setCurrent(c => c + 1); setChosen(null); setShowExpl(false); }
  };

  const score = answers.filter(a => a.correct).length;
  const pct = answers.length > 0 ? Math.round((score / answers.length) * 100) : 0;

  const grade = pct >= 90 ? { label: "Outstanding! 🏆", sub: "You're crushing it — CFA-ready!", color: "#2E7D32", bg: "#E8F5E9" }
    : pct >= 75 ? { label: "Great Work! ⭐", sub: "Solid performance — keep building!", color: "#BF6F00", bg: "#FFF8E1" }
    : pct >= 50 ? { label: "Good Start! 📚", sub: "Half way there — practice makes perfect.", color: "#1565C0", bg: "#E3F2FD" }
    : { label: "Keep Going! 💪", sub: "Every expert was once a beginner. You'll get there!", color: "#AD1457", bg: "#FCE4EC" };

  const GLOBAL_STYLE = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #F7F5F0; }
    ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #F0EDE6; } ::-webkit-scrollbar-thumb { background: #C8C0B0; border-radius: 4px; }
    .chip:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .opt-card { transition: all 0.18s ease; border: 2px solid #E8E4DC; background: #fff; }
    .opt-card:hover:not(:disabled) { border-color: #2E7D32; background: #F1F8F2; transform: translateX(3px); box-shadow: 0 4px 16px rgba(46,125,50,0.12); }
    .start-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(46,125,50,0.35) !important; }
    .nav-btn:hover { background: #F0EDE6 !important; }
    .review-row:hover { background: #F7F5F0 !important; }
    .action-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }
  `;

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0", fontFamily: "'DM Sans', sans-serif", paddingBottom: 64 }}>
      <style>{GLOBAL_STYLE}</style>

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)", padding: "48px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
        <div style={{ position:"absolute", bottom:-40, left:-40, width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:30, padding:"6px 16px", marginBottom:20 }}>
            <span style={{ fontSize:14 }}>💰</span>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>Finance MCQ Bank</span>
          </div>
          <h1 style={{ fontFamily:"'DM Serif Display', serif", fontSize:"clamp(28px,6vw,48px)", color:"#fff", lineHeight:1.2, marginBottom:12 }}>
            Sharpen Your<br /><span style={{ color:"#95D5B2", fontStyle:"italic" }}>Finance Edge</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:15, lineHeight:1.7, maxWidth:420, margin:"0 auto 28px" }}>
            200 carefully crafted MCQs across 10 core finance topics — with full explanations after every answer. 🎓
          </p>
          {/* Stats pills */}
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            {[["📚","200 Questions"],["🗂️","10 Topics"],["⚡","3 Levels"],["✅","Explained"]].map(([ic,lb]) => (
              <div key={lb} style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:30, padding:"8px 16px", display:"flex", alignItems:"center", gap:6 }}>
                <span>{ic}</span><span style={{ color:"#fff", fontSize:13, fontWeight:500 }}>{lb}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"0 20px" }}>

        {/* Topic selector */}
        <div style={{ marginTop:32 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:16 }}>🗂️</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#3D3530", textTransform:"uppercase", letterSpacing:1 }}>Choose a Topic</span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {TOPICS.map(t => {
              const meta = TOPIC_META[t];
              const active = selectedTopic === t;
              return (
                <button key={t} className="chip" onClick={() => setSelectedTopic(t)} style={{
                  background: active ? (meta ? meta.color : "#1B4332") : "#fff",
                  border: `2px solid ${active ? (meta ? meta.color : "#1B4332") : "#E8E4DC"}`,
                  borderRadius:24, padding:"8px 16px",
                  color: active ? "#fff" : "#5A5046",
                  fontSize:13, cursor:"pointer", fontWeight: active ? 700 : 500,
                  fontFamily:"'DM Sans', sans-serif", transition:"all 0.18s",
                  display:"flex", alignItems:"center", gap:6
                }}>
                  {meta ? meta.icon : "🌐"} {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div style={{ marginTop:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:16 }}>🎯</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#3D3530", textTransform:"uppercase", letterSpacing:1 }}>Difficulty Level</span>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {["All Levels","Easy","Medium","Hard"].map(d => {
              const meta = DIFF_META[d];
              const active = selectedDiff === d;
              return (
                <button key={d} className="chip" onClick={() => setSelectedDiff(d)} style={{
                  background: active ? (meta ? meta.color : "#1B4332") : "#fff",
                  border: `2px solid ${active ? (meta ? meta.border : "#1B4332") : "#E8E4DC"}`,
                  borderRadius:24, padding:"9px 22px",
                  color: active ? "#fff" : "#5A5046",
                  fontSize:13, cursor:"pointer", fontWeight: active ? 700 : 500,
                  fontFamily:"'DM Sans', sans-serif", transition:"all 0.18s"
                }}>
                  {d === "All Levels" ? "⚡ All Levels" : meta.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question count */}
        <div style={{ marginTop:28 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:16 }}>🔢</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#3D3530", textTransform:"uppercase", letterSpacing:1 }}>Questions per Session</span>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[5,10,20,30,50].map(n => (
              <button key={n} className="chip" onClick={() => setQuizCount(n)} style={{
                background: quizCount === n ? "#1B4332" : "#fff",
                border: `2px solid ${quizCount === n ? "#1B4332" : "#E8E4DC"}`,
                borderRadius:12, padding:"10px 20px",
                color: quizCount === n ? "#fff" : "#5A5046",
                fontSize:15, fontWeight: quizCount === n ? 700 : 500,
                cursor:"pointer", fontFamily:"'DM Sans', sans-serif", transition:"all 0.18s", minWidth:56
              }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Motivational nudge */}
        <div style={{ marginTop:24, background:"#FFF8E1", border:"1.5px solid #FFD54F", borderRadius:14, padding:"12px 18px", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>✨</span>
          <span style={{ color:"#6D4C00", fontSize:13, fontWeight:500 }}>{MOTIVATIONAL[motivIdx]}</span>
        </div>

        {/* CTA */}
        <button className="start-btn" onClick={startQuiz} style={{ marginTop:24, width:"100%", background:"linear-gradient(135deg, #1B4332, #40916C)", border:"none", borderRadius:16, padding:"18px", color:"#fff", fontSize:17, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", letterSpacing:0.3, transition:"all 0.25s" }}>
          Start Quiz  →
        </button>

        {/* Topics grid */}
        <div style={{ marginTop:44 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <span style={{ fontSize:16 }}>📖</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#3D3530", textTransform:"uppercase", letterSpacing:1 }}>All Topics Covered</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(190px,1fr))", gap:10 }}>
            {Object.entries(TOPIC_META).map(([topic, meta]) => (
              <div key={topic} onClick={() => { setSelectedTopic(topic); window.scrollTo({top:0,behavior:"smooth"}); }}
                style={{ background:meta.light, border:`1.5px solid ${meta.color}33`, borderRadius:14, padding:"14px 16px", cursor:"pointer", transition:"all 0.18s", borderLeft:`4px solid ${meta.color}` }}
                className="chip">
                <div style={{ fontSize:18, marginBottom:6 }}>{meta.icon}</div>
                <div style={{ fontSize:12, color:meta.color, fontWeight:700, marginBottom:3 }}>{topic}</div>
                <div style={{ fontSize:11, color:"#8A8078" }}>20 questions</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = questions[current];
    const progress = (current / questions.length) * 100;
    const topicMeta = TOPIC_META[q.topic] || { color:"#1B4332", light:"#E8F5E9", icon:"📌" };
    const diffMeta = DIFF_META[q.difficulty] || DIFF_META["Easy"];
    return (
      <div style={{ minHeight:"100vh", background:"#F7F5F0", fontFamily:"'DM Sans', sans-serif", display:"flex", flexDirection:"column" }}>
        <style>{GLOBAL_STYLE}</style>

        {/* Top bar */}
        <div style={{ background:"#fff", borderBottom:"1.5px solid #EAE6DF", padding:"13px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10 }}>
          <button className="nav-btn" onClick={() => setScreen("home")} style={{ background:"#F7F5F0", border:"1.5px solid #E8E4DC", borderRadius:10, padding:"7px 14px", color:"#5A5046", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans', sans-serif", transition:"all 0.15s" }}>← Exit</button>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13, color:"#1B4332", fontWeight:700 }}>⏱ {fmt(time)}</span>
          </div>
          <div style={{ background:"#E8F5E9", border:"1.5px solid #A5D6A7", borderRadius:10, padding:"6px 14px" }}>
            <span style={{ color:"#1B4332", fontSize:13, fontWeight:700 }}>{current+1}<span style={{ color:"#81C784" }}>/{questions.length}</span></span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height:5, background:"#E8E4DC" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg, #40916C, #74C69D)", transition:"width 0.4s ease", borderRadius:"0 4px 4px 0" }} />
        </div>

        <div style={{ flex:1, padding:"24px 20px 48px", maxWidth:660, margin:"0 auto", width:"100%" }}>

          {/* Badges */}
          <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
            <span style={{ background:topicMeta.light, border:`1.5px solid ${topicMeta.color}55`, borderRadius:20, padding:"5px 13px", color:topicMeta.color, fontSize:12, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>
              {topicMeta.icon} {q.topic}
            </span>
            <span style={{ background:diffMeta.bg, border:`1.5px solid ${diffMeta.border}`, borderRadius:20, padding:"5px 13px", color:diffMeta.color, fontSize:12, fontWeight:600 }}>
              {diffMeta.label}
            </span>
          </div>

          {/* Question card */}
          <div style={{ background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:20, padding:"24px 22px", marginBottom:18, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize:11, color:"#B0A898", fontWeight:600, letterSpacing:1.5, textTransform:"uppercase", marginBottom:10 }}>Question {current+1}</div>
            <div style={{ color:"#2C2420", fontSize:16, lineHeight:1.75, fontWeight:500 }}>{q.question}</div>
          </div>

          {/* Options */}
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {q.options.map((opt, i) => {
              let extraStyle = {};
              if (chosen !== null) {
                if (i === q.answer) extraStyle = { background:"#E8F5E9", border:"2px solid #2E7D32", color:"#1B4332" };
                else if (i === chosen && chosen !== q.answer) extraStyle = { background:"#FFEBEE", border:"2px solid #C62828", color:"#B71C1C" };
                else extraStyle = { opacity:0.45 };
              }
              return (
                <button key={i} className="opt-card" onClick={() => handleOption(i)} disabled={chosen !== null}
                  style={{ borderRadius:14, padding:"14px 18px", textAlign:"left", cursor: chosen !== null ? "default":"pointer",
                    fontSize:14, lineHeight:1.55, fontFamily:"'DM Sans', sans-serif",
                    display:"flex", alignItems:"center", gap:12, ...extraStyle }}>
                  <span style={{ width:28, height:28, borderRadius:8, background: chosen !== null && i === q.answer ? "#2E7D32" : chosen !== null && i === chosen && chosen !== q.answer ? "#C62828" : "#F0EDE6",
                    color: chosen !== null && (i === q.answer || (i === chosen && chosen !== q.answer)) ? "#fff" : "#8A8078",
                    fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.2s" }}>
                    {chosen !== null && i === q.answer ? "✓" : chosen !== null && i === chosen && chosen !== q.answer ? "✗" : String.fromCharCode(65+i)}
                  </span>
                  <span style={{ color: chosen === null ? "#2C2420" : undefined }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExpl && (
            <div style={{ marginTop:16, background:"#F0FDF4", border:"1.5px solid #86EFAC", borderRadius:16, padding:"16px 18px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontSize:16 }}>💡</span>
                <span style={{ color:"#15803D", fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>Explanation</span>
              </div>
              <div style={{ color:"#14532D", fontSize:14, lineHeight:1.7 }}>{q.explanation}</div>
            </div>
          )}

          {/* Next button */}
          {chosen !== null && (
            <button className="start-btn" onClick={next} style={{ marginTop:18, width:"100%", background:"linear-gradient(135deg, #1B4332, #40916C)", border:"none", borderRadius:14, padding:"15px", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", transition:"all 0.25s" }}>
              {current+1 >= questions.length ? "🎉 See My Results" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (screen === "result") {
    if (reviewMode) {
      const ra = answers[reviewIdx];
      const rq = ra.question;
      const topicMeta = TOPIC_META[rq.topic] || { color:"#1B4332", light:"#E8F5E9", icon:"📌" };
      return (
        <div style={{ minHeight:"100vh", background:"#F7F5F0", fontFamily:"'DM Sans', sans-serif" }}>
          <style>{GLOBAL_STYLE}</style>
          <div style={{ background:"#fff", borderBottom:"1.5px solid #EAE6DF", padding:"13px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0 }}>
            <button className="nav-btn" onClick={() => setReviewMode(false)} style={{ background:"#F7F5F0", border:"1.5px solid #E8E4DC", borderRadius:10, padding:"7px 14px", color:"#5A5046", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'DM Sans', sans-serif", transition:"all 0.15s" }}>← Results</button>
            <span style={{ color:"#5A5046", fontSize:13, fontWeight:600 }}>Review {reviewIdx+1} of {answers.length}</span>
          </div>
          <div style={{ maxWidth:660, margin:"0 auto", padding:"24px 20px" }}>
            <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
              <span style={{ background:topicMeta.light, border:`1.5px solid ${topicMeta.color}55`, borderRadius:20, padding:"5px 13px", color:topicMeta.color, fontSize:12, fontWeight:600 }}>{topicMeta.icon} {rq.topic}</span>
              <span style={{ background: ra.correct ? "#E8F5E9" : "#FFEBEE", border:`1.5px solid ${ra.correct ? "#A5D6A7" : "#EF9A9A"}`, borderRadius:20, padding:"5px 13px", color: ra.correct ? "#1B4332" : "#B71C1C", fontSize:12, fontWeight:700 }}>{ra.correct ? "✅ Correct!" : "❌ Incorrect"}</span>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:18, padding:"22px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ color:"#2C2420", fontSize:15, lineHeight:1.75 }}>{rq.question}</div>
            </div>
            {rq.options.map((opt, i) => {
              let bg="#fff", border="1.5px solid #E8E4DC", color="#5A5046";
              if (i === rq.answer) { bg="#E8F5E9"; border="1.5px solid #2E7D32"; color="#1B4332"; }
              else if (i === ra.chosen && !ra.correct) { bg="#FFEBEE"; border="1.5px solid #C62828"; color="#B71C1C"; }
              else { color="#B0A898"; }
              return (
                <div key={i} style={{ background:bg, border, borderRadius:12, padding:"12px 16px", color, fontSize:13, marginBottom:8, display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ width:24, height:24, borderRadius:6, background: i===rq.answer?"#2E7D32":i===ra.chosen&&!ra.correct?"#C62828":"#F0EDE6", color: i===rq.answer||i===ra.chosen&&!ra.correct?"#fff":"#B0A898", fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {i===rq.answer?"✓":i===ra.chosen&&!ra.correct?"✗":String.fromCharCode(65+i)}
                  </span>
                  {opt}
                </div>
              );
            })}
            <div style={{ marginTop:14, background:"#F0FDF4", border:"1.5px solid #86EFAC", borderRadius:14, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                <span>💡</span><span style={{ color:"#15803D", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>Explanation</span>
              </div>
              <div style={{ color:"#14532D", fontSize:13, lineHeight:1.65 }}>{rq.explanation}</div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button className="nav-btn action-pill" onClick={() => setReviewIdx(i => Math.max(0,i-1))} disabled={reviewIdx===0}
                style={{ flex:1, background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:12, padding:"12px", color:reviewIdx===0?"#C8C0B0":"#5A5046", cursor:reviewIdx===0?"not-allowed":"pointer", fontSize:14, fontWeight:600, fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s" }}>← Prev</button>
              <button className="nav-btn action-pill" onClick={() => setReviewIdx(i => Math.min(answers.length-1,i+1))} disabled={reviewIdx===answers.length-1}
                style={{ flex:1, background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:12, padding:"12px", color:reviewIdx===answers.length-1?"#C8C0B0":"#5A5046", cursor:reviewIdx===answers.length-1?"not-allowed":"pointer", fontSize:14, fontWeight:600, fontFamily:"'DM Sans', sans-serif", transition:"all 0.2s" }}>Next →</button>
            </div>
          </div>
        </div>
      );
    }

    const topicStats = {};
    answers.forEach(a => {
      const t = a.question.topic;
      if (!topicStats[t]) topicStats[t] = { correct:0, total:0 };
      topicStats[t].total++;
      if (a.correct) topicStats[t].correct++;
    });

    return (
      <div style={{ minHeight:"100vh", background:"#F7F5F0", fontFamily:"'DM Sans', sans-serif", paddingBottom:64 }}>
        <style>{GLOBAL_STYLE}</style>

        {/* Result hero */}
        <div style={{ background:`linear-gradient(160deg, ${grade.color} 0%, ${grade.color}CC 100%)`, padding:"44px 20px 36px", textAlign:"center" }}>
          <div style={{ fontSize:56, marginBottom:10 }}>{pct>=90?"🏆":pct>=75?"⭐":pct>=50?"📚":"💪"}</div>
          <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:28, color:"#fff", marginBottom:6 }}>{grade.label}</h2>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, marginBottom:20 }}>{grade.sub}</p>
          <div style={{ display:"inline-flex", alignItems:"baseline", gap:4, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"12px 28px" }}>
            <span style={{ fontSize:48, fontWeight:800, color:"#fff", lineHeight:1 }}>{score}</span>
            <span style={{ fontSize:20, color:"rgba(255,255,255,0.6)" }}>/{answers.length}</span>
            <span style={{ fontSize:22, fontWeight:700, color:"rgba(255,255,255,0.85)", marginLeft:8 }}>{pct}%</span>
          </div>
          <div style={{ marginTop:12, color:"rgba(255,255,255,0.6)", fontSize:13 }}>⏱ Completed in {fmt(quizTime)}</div>
        </div>

        <div style={{ maxWidth:660, margin:"0 auto", padding:"28px 20px 0" }}>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:28 }}>
            {[["✅","Correct",score,"#1B4332","#E8F5E9"],["❌","Wrong",answers.length-score,"#B71C1C","#FFEBEE"],["📊","Score",`${pct}%`,"#BF6F00","#FFF8E1"]].map(([ic,l,v,c,bg]) => (
              <div key={l} style={{ background:bg, border:`1.5px solid ${c}33`, borderRadius:16, padding:"16px 10px", textAlign:"center" }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{ic}</div>
                <div style={{ fontSize:24, fontWeight:800, color:c }}>{v}</div>
                <div style={{ fontSize:11, color:"#8A8078", marginTop:2, textTransform:"uppercase", letterSpacing:0.8 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Topic breakdown */}
          {Object.keys(topicStats).length > 0 && (
            <div style={{ background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:18, padding:"20px", marginBottom:22, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                <span>📊</span><span style={{ fontSize:13, fontWeight:700, color:"#3D3530", textTransform:"uppercase", letterSpacing:1 }}>Topic Breakdown</span>
              </div>
              {Object.entries(topicStats).map(([topic, s]) => {
                const meta = TOPIC_META[topic] || { color:"#1B4332", light:"#E8F5E9", icon:"📌" };
                const pctTopic = Math.round((s.correct/s.total)*100);
                return (
                  <div key={topic} style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, alignItems:"center" }}>
                      <span style={{ color:"#3D3530", fontSize:13, fontWeight:500, display:"flex", alignItems:"center", gap:6 }}>{meta.icon} {topic}</span>
                      <span style={{ color:meta.color, fontSize:12, fontWeight:700, background:meta.light, borderRadius:8, padding:"2px 8px" }}>{s.correct}/{s.total}</span>
                    </div>
                    <div style={{ height:8, background:"#F0EDE6", borderRadius:6 }}>
                      <div style={{ height:"100%", width:`${pctTopic}%`, background:`linear-gradient(90deg,${meta.color},${meta.color}BB)`, borderRadius:6, transition:"width 0.7s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Q-by-Q list */}
          <div style={{ background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:18, padding:"20px", marginBottom:22, boxShadow:"0 2px 10px rgba(0,0,0,0.04)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <span>📋</span><span style={{ fontSize:13, fontWeight:700, color:"#3D3530", textTransform:"uppercase", letterSpacing:1 }}>Question Summary</span>
              <span style={{ marginLeft:"auto", fontSize:12, color:"#8A8078" }}>Tap to review</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {answers.map((a, i) => (
                <div key={i} className="review-row" onClick={() => { setReviewIdx(i); setReviewMode(true); }}
                  style={{ background:"#FAFAF8", border:`1.5px solid ${a.correct?"#A5D6A7":"#EF9A9A"}`, borderRadius:12, padding:"11px 14px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", transition:"all 0.15s" }}>
                  <span style={{ width:26, height:26, borderRadius:8, background:a.correct?"#E8F5E9":"#FFEBEE", color:a.correct?"#1B4332":"#B71C1C", fontSize:12, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>Q{i+1}</span>
                  <span style={{ flex:1, fontSize:12, color:"#5A5046", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.question.question.substring(0,52)}…</span>
                  <span style={{ fontSize:15 }}>{a.correct?"✅":"❌"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:10 }}>
            <button className="action-pill" onClick={() => setScreen("home")} style={{ flex:1, background:"#fff", border:"1.5px solid #E8E4DC", borderRadius:14, padding:"14px", color:"#5A5046", fontSize:14, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", fontWeight:600, transition:"all 0.2s" }}>🏠 Home</button>
            <button className="action-pill start-btn" onClick={startQuiz} style={{ flex:2, background:"linear-gradient(135deg,#1B4332,#40916C)", border:"none", borderRadius:14, padding:"14px", color:"#fff", fontSize:14, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", fontWeight:700, transition:"all 0.25s" }}>🔄 Try Again</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
