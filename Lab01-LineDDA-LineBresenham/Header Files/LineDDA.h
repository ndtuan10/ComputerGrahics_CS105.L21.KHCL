#pragma once

// Vẽ đường thẳng tăng chậm / giảm chậm DDA
void LineDDA1(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);

// Vẽ đường thẳng tăng nhanh / giảm nhanh DDA
void LineDDA2(CDC* pDC, int x1, int y1, int x2, int y2, COLORREF color);
