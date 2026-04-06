export interface Message {
  sender: "bot" | "customer";
  text: string;
  image?: string;
}

function createBubble(
  msg: Message,
  theme: string,
  logo: string,
  storeName: string,
): HTMLElement {
  const wrapper = document.createElement("div");
  const isCustomer = msg.sender === "customer";
  const isWhatsapp = theme === "whatsapp";

  wrapper.className = `chat-bubble flex gap-2 ${isCustomer ? "justify-end" : "justify-start items-end"}`;

  if (!isCustomer && !isWhatsapp) {
    const avatar = document.createElement("div");
    avatar.className =
      "w-6 h-6 shrink-0 rounded-full overflow-hidden bg-indigo-50";
    avatar.innerHTML =
      `<img src="${logo}" alt="${storeName}" class="w-full h-full object-cover" />`;
    wrapper.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  const baseClasses =
    "rounded-2xl px-3 py-1.5 text-[13.5px] max-w-[85%] whitespace-pre-line leading-relaxed";

  if (isWhatsapp) {
    bubble.className = `${baseClasses} ${
      isCustomer
        ? "bg-white text-slate-800 rounded-br-sm shadow-sm"
        : "bg-[#DCF8C6] text-slate-800 rounded-bl-sm"
    }`;
  } else {
    bubble.className = `${baseClasses} ${
      isCustomer
        ? "bg-indigo-500 text-white rounded-br-md"
        : "bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm"
    }`;
  }

  const text = msg.text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (urlRegex.test(text)) {
    const parts = text.split(urlRegex);
    parts.forEach((part) => {
      if (part.match(urlRegex)) {
        const link = document.createElement("a");
        link.href = part;
        link.textContent = part;
        link.className = "text-blue-500 underline";
        link.target = "_blank";
        bubble.appendChild(link);
      } else {
        bubble.appendChild(document.createTextNode(part));
      }
    });
  } else {
    bubble.textContent = text;
  }

  // Image-only bubble: return a standalone chat-bubble wrapper
  if (msg.image && !msg.text) {
    const bubbleBase = "rounded-2xl px-1 py-1 max-w-[85%]";
    let bubbleClass = "";
    if (isWhatsapp) {
      bubbleClass = isCustomer
        ? `${bubbleBase} bg-white rounded-br-sm shadow-sm`
        : `${bubbleBase} bg-[#DCF8C6] rounded-bl-sm`;
    } else {
      bubbleClass = isCustomer
        ? `${bubbleBase} bg-indigo-500 rounded-br-md`
        : `${bubbleBase} bg-white border border-slate-200 rounded-bl-md shadow-sm`;
    }

    const imgWrap = document.createElement("div");
    imgWrap.className = bubbleClass;
    const img = document.createElement("img");
    img.src = msg.image;
    img.className = "rounded-xl max-w-full";
    img.loading = "lazy";
    imgWrap.appendChild(img);
    wrapper.appendChild(imgWrap);
    return wrapper;
  }

  if (isWhatsapp && isCustomer) {
    const checks = document.createElement("span");
    checks.textContent = " \u2713\u2713";
    checks.className = "text-[10px] text-blue-500 ml-1";
    bubble.appendChild(checks);
  }

  wrapper.appendChild(bubble);
  return wrapper;
}

function scrollBottom(el: HTMLElement) {
  el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
}

function showBubble(bubble: HTMLElement) {
  // Force reflow so browser sees initial state (opacity:0) before transitioning
  bubble.offsetHeight;
  bubble.classList.add("visible");
}

function buildTypingHTML(
  sender: string,
  theme: string,
  logo: string,
  storeName: string,
): string {
  const isCustomer = sender === "customer";
  const isWhatsapp = theme === "whatsapp";
  const dots = `<div class="flex gap-1 items-center">
    <span class="typing-dot w-2 h-2 ${isWhatsapp ? "bg-slate-500" : "bg-slate-400"} rounded-full"></span>
    <span class="typing-dot w-2 h-2 ${isWhatsapp ? "bg-slate-500" : "bg-slate-400"} rounded-full"></span>
    <span class="typing-dot w-2 h-2 ${isWhatsapp ? "bg-slate-500" : "bg-slate-400"} rounded-full"></span>
  </div>`;

  if (isCustomer) {
    // Customer: right-aligned, no avatar
    const bubbleClass = isWhatsapp
      ? "bg-white rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm"
      : "bg-indigo-500 rounded-2xl rounded-br-md px-4 py-2.5";
    return `<div class="flex justify-end">
      <div class="${bubbleClass}">${dots.replace(/bg-slate-\d+/g, isWhatsapp ? "bg-slate-500" : "bg-white/60")}</div>
    </div>`;
  } else {
    // Bot: left-aligned, with avatar (default theme only)
    if (isWhatsapp) {
      return `<div class="flex items-end gap-2">
        <div class="bg-[#DCF8C6] rounded-2xl rounded-bl-sm px-4 py-2.5">${dots}</div>
      </div>`;
    } else {
      return `<div class="flex items-end gap-2">
        <div class="w-6 h-6 shrink-0 rounded-full overflow-hidden bg-indigo-50">
          <img src="${logo}" alt="${storeName}" class="w-full h-full object-cover" />
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">${dots}</div>
      </div>`;
    }
  }
}

function showTyping(
  indicator: HTMLElement | null,
  sender: string,
  theme: string,
  logo: string,
  storeName: string,
) {
  if (!indicator) return;
  indicator.innerHTML = buildTypingHTML(sender, theme, logo, storeName);
  indicator.classList.add("active");
}

function hideTyping(indicator: HTMLElement | null) {
  if (!indicator) return;
  indicator.classList.remove("active");
}

function groupMessages(
  msgs: Message[],
): { sender: string; msgs: Message[] }[] {
  const groups: { sender: string; msgs: Message[] }[] = [];
  for (const msg of msgs) {
    const last = groups[groups.length - 1];
    if (last && last.sender === msg.sender) {
      last.msgs.push(msg);
    } else {
      groups.push({ sender: msg.sender, msgs: [msg] });
    }
  }
  return groups;
}

function insertBubble(bubble: HTMLElement, container: HTMLElement) {
  // Insert before typing indicator so indicator stays at bottom
  const typing = container.querySelector(".chat-typing");
  if (typing) {
    container.insertBefore(bubble, typing);
  } else {
    container.appendChild(bubble);
  }
}

function playConversation(
  groups: { sender: string; msgs: Message[] }[],
  groupIndex: number,
  delay: number,
  theme: string,
  container: HTMLElement,
  typingIndicator: HTMLElement | null,
  logo: string,
  storeName: string,
  onComplete: () => void,
) {
  if (groupIndex >= groups.length) {
    onComplete();
    return;
  }

  const group = groups[groupIndex];
  const isBot = group.sender === "bot";
  const sender = group.sender;

  if (isBot) {
    const typingDuration = delay * 0.7;
    const prePause = groupIndex === 0 ? 0 : 400;

    setTimeout(() => {
      showTyping(typingIndicator, sender, theme, logo, storeName);
      scrollBottom(container);

      setTimeout(() => {
        // Insert first bubble (opacity 0) BEFORE hiding indicator → no layout gap
        const firstBubble = createBubble(group.msgs[0], theme, logo, storeName);
        insertBubble(firstBubble, container);
        hideTyping(typingIndicator);
        showBubble(firstBubble);
        scrollBottom(container);

        // Remaining bubbles with stagger
        group.msgs.slice(1).forEach((msg, i) => {
          setTimeout(
            () => {
              const bubble = createBubble(msg, theme, logo, storeName);
              insertBubble(bubble, container);
              showBubble(bubble);
              scrollBottom(container);
            },
            (i + 1) * 350,
          );
        });

        const revealTime = (group.msgs.length - 1) * 350 + 200;
        setTimeout(() => {
          playConversation(
            groups,
            groupIndex + 1,
            delay,
            theme,
            container,
            typingIndicator,
            logo,
            storeName,
            onComplete,
          );
        }, revealTime);
      }, typingDuration);
    }, prePause);
  } else {
    const sender = group.sender;
    const typingDuration = delay * 0.6;
    const prePause = groupIndex === 0 ? 0 : 300;

    setTimeout(() => {
      showTyping(typingIndicator, sender, theme, logo, storeName);
      scrollBottom(container);

      let i = 0;
      function revealNext() {
        if (i >= group.msgs.length) {
          playConversation(
            groups,
            groupIndex + 1,
            delay,
            theme,
            container,
            typingIndicator,
            logo,
            storeName,
            onComplete,
          );
          return;
        }

        const typingTime = delay * 0.6;
        setTimeout(() => {
          // Insert bubble BEFORE hiding indicator → no layout gap
          const bubble = createBubble(group.msgs[i], theme, logo, storeName);
          insertBubble(bubble, container);
          hideTyping(typingIndicator);
          showBubble(bubble);
          scrollBottom(container);
          i++;

          if (i < group.msgs.length) {
            setTimeout(() => {
              showTyping(typingIndicator, sender, theme, logo, storeName);
              scrollBottom(container);
              setTimeout(() => revealNext(), typingTime);
            }, 300);
          } else {
            revealNext();
          }
        }, typingTime);
      }

      revealNext();
    }, prePause);
  }
}

export function initChatSimulations() {
  document.querySelectorAll(".chat-simulation").forEach((container) => {
    if (container.hasAttribute("data-initialized")) return;
    container.setAttribute("data-initialized", "true");

    const delay = parseInt(container.getAttribute("data-delay") || "1500");
    const pause = parseInt(container.getAttribute("data-pause") || "3000");
    const theme = container.getAttribute("data-theme") || "default";
    const logo = container.getAttribute("data-logo") || "/favicon.svg";
    const sn = container.getAttribute("data-store-name") || "";
    const shouldLoop = container.getAttribute("data-loop") !== "false";
    const conversations: Message[][] = JSON.parse(
      container.getAttribute("data-conversations") || "[]",
    );

    if (!conversations.length) return;

    const messagesContainer = container.querySelector(
      ".chat-messages",
    ) as HTMLElement;
    const typingIndicator = container.querySelector(
      ".chat-typing",
    ) as HTMLElement | null;

    let currentSet = 0;
    let isVisible = false;
    let hasStarted = false;

    function showConversation(index: number) {
      hasStarted = true;
      messagesContainer.classList.add("fading");

      setTimeout(() => {
        messagesContainer
          .querySelectorAll(".chat-bubble")
          .forEach((b) => b.remove());
        messagesContainer.classList.remove("fading");

        const groups = groupMessages(conversations[index]);

        playConversation(
          groups,
          0,
          delay,
          theme,
          messagesContainer,
          typingIndicator,
          logo,
          sn,
          () => {
            if (shouldLoop) {
              setTimeout(() => {
                currentSet = (currentSet + 1) % conversations.length;
                showConversation(currentSet);
              }, pause);
            } else {
              container.dispatchEvent(
                new CustomEvent("chat-complete", { bubbles: true }),
              );
            }
          },
        );
      }, 400);
    }

    // Listen for reset event to restart conversation
    container.addEventListener("chat-reset", () => {
      if (!hasStarted) return; // Don't reset before first play
      currentSet = 0;
      messagesContainer
        .querySelectorAll(".chat-bubble")
        .forEach((b) => b.remove());
      hideTyping(typingIndicator);
      showConversation(0);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            showConversation(currentSet);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(container);
  });
}
