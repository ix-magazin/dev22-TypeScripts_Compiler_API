// TypeScript AST Viewer, AST source: <https://ts-ast-viewer.com/#code/MYewdgzgLgBAtgUwhAhgcwQLhtATgSzDRgF4YAiACRQBsaQYB1BGqcgbiA>


//////////////////////////////////////////////////////////////
// Listing 1: Einfacher „Hallo Welt“-Ausdruck in TypeScript //
////////////////////////////////////////////////////////////// 

const message: string = "Hallo Welt";


/////////////////////////////////////////////////////////////////////////////////
// Listing 2: TypeScript-Methode, um die Kompatibilität zweier Typen zu prüfen //
/////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if 'source' is related to 'target' (e.g.: is a assignable to).
 * @param source The left-hand-side of the relation.
 * @param target The right-hand-side of the relation.
 * @param relation The relation considered. One of 'identityRelation', 'subtypeRelation', 'assignableRelation', or 'comparableRelation'.
 * Used as both to determine which checks are performed and as a cache of previously computed results.
 * @param errorNode The suggested node upon which all errors will be reported, if defined. This may or may not be the actual node used.
 * @param headMessage If the error chain should be prepended by a head message, then headMessage will be used.
 * @param containingMessageChain A chain of errors to prepend any new errors found.
 * @param errorOutputContainer Return the diagnostic. Do not log if 'skipLogging' is truthy.
 */
function checkTypeRelatedTo(
    source: Type,
    target: Type,
    relation: ESMap<string, RelationComparisonResult>,
    errorNode: Node | undefined,
    headMessage?: DiagnosticMessage,
    containingMessageChain?: () => DiagnosticMessageChain | undefined,
    errorOutputContainer?: { errors?: Diagnostic[], skipLogging?: boolean },
): boolean;


///////////////////////////////////////////////////////////////////////////////
// Listing 3: Mit dieser Methode parst der Compiler das Enum-Sprachkonstrukt //
///////////////////////////////////////////////////////////////////////////////

function parseEnumDeclaration(pos: number, hasJSDoc: boolean, decorators: NodeArray<Decorator> | undefined, modifiers: NodeArray<Modifier> | undefined): EnumDeclaration {
    parseExpected(SyntaxKind.EnumKeyword);
    const name = parseIdentifier();
    let members;
    if (parseExpected(SyntaxKind.OpenBraceToken)) {
        members = doOutsideOfYieldAndAwaitContext(() => parseDelimitedList(ParsingContext.EnumMembers, parseEnumMember));
        parseExpected(SyntaxKind.CloseBraceToken);
    }
    else {
        members = createMissingList<EnumMember>();
    }
    const node = factory.createEnumDeclaration(decorators, modifiers, name, members);
    return withJSDoc(finishNode(node, pos), hasJSDoc);
}


/////////////////////////////////////////////////////////////////////////////////
// Listing 4: Ein TypeScript-Enum nach der Umwandlung in puren JavaScript-Code //
/////////////////////////////////////////////////////////////////////////////////

var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 0] = "Red";
    Colors[Colors["Green"] = 1] = "Green";
    Colors[Colors["Yellow"] = 2] = "Yellow";
})(Colors || (Colors = {}));


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Listing 5: Beispielhafte Auswahl von ES2020-Funktionen, für die der Compiler Abwärtskompatibilität bietet //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface User {
    name?: string;
}

const Max: User = {};
console.log(Max?.name)


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Listing 6: Die Ausgabe moderner ES2020-Funktionen durch den Compiler variiert je nach Zielsprachniveau //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Target < ES 2020
console.log(Max === null || Max === void 0 ? void 0 : Max.name);

// Target >= ES 2020
console.log(Max?.name);


//////////////////////////////////////////////////////////////////////////////////////////
// Listing 7: Die Umwandlung von TypeScript zu JavaScript erfordert nur eine Zeile Code //
//////////////////////////////////////////////////////////////////////////////////////////

import * as ts from "typescript";

const inputSourceCode = /* read input file here */ "";
const result = ts.transpileModule(inputSourceCode, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

console.log(result.outputText);
console.log(JSON.stringify(result.diagnostics));


//////////////////////////////////////////////////////////////////////////
// Listing 8: Eine beispielhafte TypeScript-Klasse als Compiler-Eingabe //
//////////////////////////////////////////////////////////////////////////

class Person {
  private type: string | null = null;
  protected age: number = 23;

  constructor(public name: string, public userName: string, private email: string) {
    this.name = name;
    this.userName = userName;
    this.email = email;
  }

  public printAge = () => {
    console.log(this.age);
    this.setType(this.age < 18 = 'jung' : "alt");
  }

  private setType = (type: string) => {
    this.type = type;
    console.log(this.type);
  }
}

const person = new Person('Franz', 'fmueller', 'example@email.com');
person.printAge(); // Prints: 23


///////////////////////////////////////////////////////////////////////////
// Listing 9: Ausgabe einer TypeScript-Klasse in gewöhnlichem JavaScript //
///////////////////////////////////////////////////////////////////////////

var Person = /** @class */ (function () {
    function Person(name, userName, email) {
        var _this = this;
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.type = null;
        this.age = 23;
        this.printAge = function () {
            console.log(_this.age);
            _this.setType(_this.age < 18, 'jung', "alt");
        };
        this.setType = function (type) {
            _this.type = type;
            console.log(_this.type);
        };
        this.name = name;
        this.userName = userName;
        this.email = email;
    }
    return Person;
}());
var person = new Person('Franz', 'fmueller', 'example@email.com');
person.printAge(); // Prints: 23


//////////////////////////////////////////////////////////////////////////////
// Listing 10: Eingabe für den DIY-Linter mit einigen stilistischen Fehlern //
//////////////////////////////////////////////////////////////////////////////

// Expliziter Return-Type erforderlich (void)
function test() {
  return;
}

function test2(): number {
  return;
}

// ...

// Der any-Type soll nicht explizit deklariert werden
// Variablen sollen nach camelCase-Notation benannt sein
let TestVaRiaBlE: any;

// ...

// Variablen namens "Type" müssen Enums sein, keine Strings
const objectType: string = 'User';


//////////////////////////////////////////////////////////////////
// Listing 11: Struktur des mit tsc-API selbstgebauten Linters  //
//////////////////////////////////////////////////////////////////

import { readFileSync } from "fs";
import * as ts from "typescript";

export function customLinter(sourceFile: ts.SourceFile) {
  lintNode(sourceFile);

  function lintNode(node: ts.Node) {
    // Hier können Regeln implementiert werden

    ts.forEachChild(node, lintNode);
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`);
  }
}

// Datei einlesen
const fileName = "ex01_input.ts";
const sourceFile = ts.createSourceFile(
  fileName,
  readFileSync(fileName).toString(),
  ts.ScriptTarget.ES2015,
  /*setParentNodes */ true
);

customLinter(sourceFile);


///////////////////////////////////////////////////////////////////////
// Listing 12: Linter-Methode, die auf explizite Rückgabetypen prüft //
///////////////////////////////////////////////////////////////////////

function lintNode(node: ts.Node) {
    switch (node.kind) {
      // Funktionen brauchen expliziten return-Type
      case ts.SyntaxKind.FunctionDeclaration:
        const fnStatement = node as ts.FunctionDeclaration;

        if(fnStatement.type === undefined) {
          report(fnStatement, 'A function must declare an explicit return type');
        }
        break;

      case ts.SyntaxKind.VariableDeclaration:
        const varNode = node as ts.VariableDeclaration;
        const varType = checker.typeToString(checker.getTypeAtLocation(varNode.type));
        break;
    }

    ts.forEachChild(node, lintNode);
  }


////////////////////////////////////////////////////////////////////////
// Listing 13: Struktur des Linters nach Hinzunahme von Type-Checking //
////////////////////////////////////////////////////////////////////////

export function customLinter(sourceFile: ts.SourceFile, checker:ts.TypeChecker) {
    // ...
}

const program = ts.createProgram([fileName], {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});

customLinter(program.getSourceFile(fileName), program.getTypeChecker());


/////////////////////////////////////////////////////////////////////////////////////////////
// Listing 14: Weitere Linter-Methode zum Überprüfen auf Namenskonvention und Variablentyp //
/////////////////////////////////////////////////////////////////////////////////////////////

function lintNode(node: ts.Node) {
    switch (node.kind) {
      // ...
      case ts.SyntaxKind.VariableDeclaration:
        const varStatement = node as ts.VariableDeclaration;

        // Variablen Typ darf - wenn er explizit ist - nicht any sein
        const varType = checker.typeToString(checker.getTypeAtLocation(varStatement.type));
        if(varStatement.type !== undefined && varType === 'any') {
          report(varStatement, 'Variables with explicit any types are not allowed')
        }

        // Variablen-Namen müssen im camelCase formattiert sein
        const variableName = checker.getSymbolAtLocation(varStatement.name).getName();
        if(/^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/.test(variableName) === false) {
          report(varStatement, `Variables must be named in camelCase. ${variableName} is invalid.`)
        }

        break;
    }

    ts.forEachChild(node, lintNode);
}


////////////////////////////////////////////////////////////
// Listing 15: Beispiel für ein einfaches TypeScript-Enum //
////////////////////////////////////////////////////////////

enum ObjectType {
    User,
    File,
    Folder
}


//////////////////////////////////////////////////////////////////////////////////
// Listing 16: Ergänzung des Linters, um die Nutzung von Enums zu gewährleisten //
//////////////////////////////////////////////////////////////////////////////////

function lintNode(node: ts.Node) {
    switch (node.kind) {
      // ...
      case ts.SyntaxKind.VariableDeclaration:
        const varStatement = node as ts.VariableDeclaration;

        // ...

        // Enums müssen genutzt werden für Type-Variablen
        if(/type/i.test(variableName) && varType.toLocaleLowerCase() === 'string') {
          report(varStatement, `Use Enums to represent types, not strings`);
        }

        break;
    }

    ts.forEachChild(node, lintNode);
}