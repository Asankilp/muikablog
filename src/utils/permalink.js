// src/utils/permalink.js
import { crc16 } from "crc";

/**
 * 根据输入字符串生成一个唯一的、类似 abbrlink 的 ID
 * @param {string} inputString - 用于生成 ID 的唯一字符串，例如文章的 ID 或 slug
 * @returns {string} - 生成的十六进制字符串 ID
 */
export function generateAbbrlink(inputString) {
	// 使用 crc16 算法，与 hexo-abbrlink 插件的默认行为相似
	return Number.parseInt(crc16(inputString), 16).toString(16);
}
