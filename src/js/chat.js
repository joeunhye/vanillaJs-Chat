"use strict";

const socket = io();

const $nickname = document.querySelector("#nickname");
const $chatList = document.querySelector(".chatting-list");
const $chatInput = document.querySelector(".chatting-input");
const $sendBtn = document.querySelector(".send-button");
const $displayEl = document.querySelector(".display-container");

$chatInput.addEventListener("keypress", e => {
	if (e.keyCode === 13) {
		send();
	}
});

function send() {
	const param = {
		name: $nickname.value,
		msg: $chatInput.value,
	};
	socket.emit("chatting", param);
}

$sendBtn.addEventListener("click", send);

socket.on("chatting", data => {
	console.log(data);
	const { name, msg, time } = data;
	const item = new LiModel(name, msg, time);
	item.makeLi();
	$displayEl.scrollTo(0, $displayEl.scrollHeight);
});

class LiModel {
	constructor(name, msg, time) {
		this.name = name;
		this.msg = msg;
		this.time = time;
	}
	makeLi() {
		const $li = document.createElement("li");
		$li.classList.add($nickname.value === this.name ? "sent" : "received");
		const $dom = `
            <span class="profile">
                <span class="user">${this.name}</span>
                <img src="https://placeimg.com/50/50/any" alt="">
            </span>
            <span class="message">
            ${this.msg}
            </span>
            <span class="time">${this.time}</span>
        `;
		$li.innerHTML = $dom;
		$chatList.appendChild($li);
	}
}
