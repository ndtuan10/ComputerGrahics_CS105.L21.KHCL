#include "pch.h"
#include "LineBresenham.h"
void LineBresenham(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color) {
	int Dx = x2 - x1;
	int Dy = y2 - y1;
	int yStep = (Dy >= 0) ? 1 : -1;
	Dx = abs(Dx);
	Dy = abs(Dy);
	int Const1 = Dy << 1;
	int Const2 = (Dy - Dx) << 1;
	int p = Const1 - Dx;
	pDC->SetPixel(x1, y1, color);
	for (int i = 0; i < Dx; i++) {
		if (p < 0)
			p += Const1;
		else {
			p += Const2;
			y1 += yStep;
		}
		++x1;
		pDC->SetPixel(x1, y1, color);
	}
}
