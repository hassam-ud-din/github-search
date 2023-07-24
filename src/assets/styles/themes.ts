import { getAlphaColor, getSolidColor } from "./colorAlgorithm"

const lightColorBgBase: string = "#f0f2f5"
const lightColorTextBase: string = "#000"

export const lightThemeToken = {
  colorBgBase: lightColorBgBase,
  colorTextBase: lightColorTextBase,
  colorText: getAlphaColor(lightColorTextBase, 0.88),
  colorTextSecondary: getAlphaColor(lightColorTextBase, 0.65),
  colorTextTertiary: getAlphaColor(lightColorTextBase, 0.45),
  colorTextQuaternary: getAlphaColor(lightColorTextBase, 0.25),

  colorFill: getAlphaColor(lightColorTextBase, 0.15),
  colorFillSecondary: getAlphaColor(lightColorTextBase, 0.06),
  colorFillTertiary: getAlphaColor(lightColorTextBase, 0.04),
  colorFillQuaternary: getAlphaColor(lightColorTextBase, 0.02),

  colorBgLayout: getSolidColor(lightColorBgBase, 4),
  colorBgContainer: getSolidColor(lightColorBgBase, 0),
  colorBgElevated: getSolidColor(lightColorBgBase, 0),
  colorBgSpotzlight: getAlphaColor(lightColorTextBase, 0.85),
}

const darkColorBgBase: string = "#000"
const darkColorTextBase: string = "#fff"

export const darkThemeToken = {
  colorBgBase: darkColorBgBase,
  colorTextBase: darkColorTextBase,
  colorText: getAlphaColor(darkColorTextBase, 0.85),
  colorTextSecondary: getAlphaColor(darkColorTextBase, 0.65),
  colorTextTertiary: getAlphaColor(darkColorTextBase, 0.45),
  colorTextQuaternary: getAlphaColor(darkColorTextBase, 0.25),

  colorFill: getAlphaColor(darkColorTextBase, 0.18),
  colorFillSecondary: getAlphaColor(darkColorTextBase, 0.12),
  colorFillTertiary: getAlphaColor(darkColorTextBase, 0.08),
  colorFillQuaternary: getAlphaColor(darkColorTextBase, 0.04),

  colorBgElevated: getSolidColor(darkColorBgBase, 12),
  colorBgContainer: getSolidColor(darkColorBgBase, 8),
  colorBgLayout: getSolidColor(darkColorBgBase, 0),
  colorBgSpotlight: getSolidColor(darkColorBgBase, 26),

  colorBorder: getSolidColor(darkColorBgBase, 26),
  colorBorderSecondary: getSolidColor(darkColorBgBase, 19),
}
