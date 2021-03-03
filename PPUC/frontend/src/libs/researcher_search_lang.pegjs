S
= exprQ:Q { return {query: exprQ} }

Q
= QOR / QAND / PP / P

AND
= " and "i

OR
= " or "i

ESC
= "\""

QOR
= exprQOP:QOP OR exprQ:Q { return {operation: "OR", operand1: exprQOP, operand2: exprQ} }

QAND
= exprQOP:QOP AND exprQ:Q { return {operation: "AND", operand1: exprQOP, operand2: exprQ} }

QOP = PP / P

PP
= ESC (P " ")* P ESC { return text() }

P
= [A-Za-z0-9'.!?]+ { return text() }
