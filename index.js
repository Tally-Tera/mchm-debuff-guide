'use strict';

const fs = require('fs');
const path = require('path');
let config = require('./config.js');

module.exports = function mchm(mod) {
	let enabled = config.enable; // true by default
	let nextDebuff = 0;
	
	// enable / disable mod default on
	mod.command.add('mchm',(arg)=>{
		enabled = !enabled;
		mod.command.message(`MCHM Debuff Guide is now ${(enabled) ? 'en' : 'dis' }abled.`);
	});
	
	mod.hook('S_ABNORMALITY_BEGIN', 4, (event) => {
		if (!enabled || !mod.game.me.is(event.target)) return;
		switch(event.id){
			case 47703200: nextDebuff = '2';
				break;
			case 47703300: nextDebuff = '3';
				break;
			case 47703400: nextDebuff = '1';
				break;
			default: return;
		}
		// attack type s-427-2007-1112-0
		mod.send("S_CUSTOM_STYLE_SYSTEM_MESSAGE", 1, {
			message: `<p><font size="30" color="#FF4500">next: ${nextDebuff}</font></p>`,
			style: 50
		});
		
		mod.send("S_PLAY_SOUND", 1, { SoundID: 3028 });
		mod.command.message(nextDebuff);

		setTimeout(function () {
			mod.send("S_CUSTOM_STYLE_SYSTEM_MESSAGE", 1, {
				message: `<p><font size="30" color="#FF4500">next: ${nextDebuff}</font></p>`,
				style: 50
			});
			mod.command.message(nextDebuff);
			mod.send("S_PLAY_SOUND", 1, { SoundID: 3028 });
			}, 40000)
		return;
	});
}