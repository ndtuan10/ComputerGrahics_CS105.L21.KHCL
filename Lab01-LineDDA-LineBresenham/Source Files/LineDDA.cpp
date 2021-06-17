#include "pch.h"
#include "LineDDA.h"
#define Round(x) (int) (x+0.5)

void LineDDA1(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color)
{
	pDC->SetPixel(x1, y1, color);
	float m = (y2 - y1) * 1.0 / (x2 - x1);
	int x = x1;
	int y = y1;
	for (; x < x2;) {
		x = x + 1;
		y = y + m;
		y = Round(y);
		pDC->SetPixel(x, y, color);
	}
}
void LineDDA2(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) {
	pDC->SetPixel(x1, y1, color);
	float m = (float)(x2 - x1) / (y2 - y1);
	float x = x1;
	while (y1 < y2) {
		y1++;
		x += m;
		pDC->SetPixel(Round(x), y1, color);
	}
}
