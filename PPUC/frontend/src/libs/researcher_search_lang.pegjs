S
= exprQ:Q { return {query: exprQ} }

Q
= QOR / QAND / PP / P

AND
= " and "i

OR
= " or "i

QOR
= exprPP:QOP OR exprQ:Q { return {operation: "OR", operand1: exprPP, operand2: exprQ} }

QAND
= exprPP:QOP AND exprQ:Q { return {operation: "AND", operand1: exprPP, operand2: exprQ} }

QOP = PP / P

PP
= "\"" (P " ")* P "\"" { return text() }

P
= [A-Za-z0-9]+ { return text() }
