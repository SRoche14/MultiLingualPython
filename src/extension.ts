// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { strictEqual } from 'assert';
// import { privateEncrypt } from 'crypto';
// import { resolve } from 'path/posix';
// import { arrayBuffer, text } from 'stream/consumers';
import { privateEncrypt } from 'crypto';
import * as vscode from 'vscode';
import * as fs from 'fs';
// import translate from 'translate';
const translate = require('translate-google');
let path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "multilingualpython" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('multilingualpython.MultiLingualPython', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('MultiLingualPython Started.');
	});

	let disposable2 = vscode.commands.registerCommand('extension.scanDocument', function () {
        largeStuff();
    });

	context.subscriptions.push(disposable);

	context.subscriptions.push(disposable2);
}

function largeStuff() {
	// Get the active text editor
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		let document = editor.document;

		// Get the document text
		let documentText = document.getText();

		const spanKeyWordDict: {[key: string]: string} = {
			"False": "Falso",
			"None": "Nada",
			"True": "Verdadero",
			"and": "y", 
			"as": "como",
			"assert": "afirmar",
			"async": "async",
			"await": "aguardar",
			"break": "cortar",
			"class": "clase",
			"continue": "continuar",
			"def": "def",
			"del": "borrar",
			"elif": "otro_si",
			"else": "otro",
			"except": "excepto",
			"finally": "finalmente",
			"for": "para",
			"from": "desde",
			"global": "global",
			"if": "si",
			"import": "importar",
			"in": "en", 
			"is": "es",
			"lambda": "lambda",
			"nonlocal": "~local",
			"not": "~", 
			"or": "o", 
			"pass": "pasar",
			"raise": "plantear",
			"return": "devolver",
			"try": "intentar", 
			"while": "mientras",
			"with": "con", 
			"yield": "ceder",
			"self": "mismo",
			"List": "Lista",
			"NotImplemented": "No_se_ha_implementado",
			"Any": "Cualquiara",
			"any": "cualquiara",
			"Callable": "Llamable",
			"Union": "Unión",
			"Set": "Conjunto",
			"Sequence": "Secuencia",
			"Dict": "Dicc",
			"object": "objeto",
			"Tuple": "Tupla",
			"ArithmeticError": "AritméticaError",
			"AssertionError": "AfirmaciónError",
			"AttributeError": "AtributoError",
			"BufferError": "BúferError",
			"BlockingIOError": "BloqueandoIOError",
			"BrokenPipeError": "TuberíaRotaError",
			"ChildProcessError": "ProcessoInfantilError",
			"ConnectionAbortedError": "ConexiónAbortadaError",
			"ConnectionRefusedError": "ConexiónRechazadaError",
			"ConnectionResetError": "ConexiónReiniciada",
			"EnvironmentError": "MedioAmbienteError",
			"FileExistsError": "ArchivoExisteError",
			"FileNotFoundError": "ArchivoNoEncontradoError",
			"FloatingPointError": "FlotatingPointError",
			"ImportError": "ImportaciónError",
			"IndentationError": "MuescaError",
			"IndexError": "ÍndiceError",
			"InterruptedError": "InterrumpidoError",
			"IsADirectoryError": "EsADirectorioError",
			"NotADirectoryError": "NoADirectorioError",
			"PermissionError": "PermisoError",
			"ProcessLookupError": "ProcesoBùsquedaError",
			"TimeoutError": "SeAcabóElTiempoError",
			"KeyError": "ClaveError",
			"LookupError": "BúsquedaError",
			"MemoryError": "MemoriaError",
			"NameError": "NombreError",
			"NotImplementedError": "NoSeHaImplementadoError",
			"OverflowError": "DesbordamientoError",
			"ReferenceError": "ReferenciaError",
			"RuntimeError": "TiempoDeEjecuciónError",
			"RecursionError": "RecursiónError",
			"SyntaxError": "SintaxisError",
			"SystemError": "SistemaError",
			"TabError": "PestañaError",
			"TypeError": "TipoError",
			"UnboundLocalError": "SueltoLocalError",
			"UnicodeEncodeError": "UnicodeCodificarError",
			"UnicodeDecodeError": "UnicodeDescodificarError",
			"UnicodeTranslateError": "UnicodeTraducirError",
			"ValueError": "ValorError",
			"WindowsError": "VentanasError",
			"ZeroDivisionError": "CeroDivisiónError",
			"ModuleNotFoundError": "MóduloNoEncontradoError",
			"PendingDeprecationWarning": "PendienteDeprecationAviso",
			"RuntimeWarning": "TiempoDeEjecuciónAviso",
			"SyntaxWarning": "SintaxisAviso",
			"UserWarning": "UsarioAviso",
			"FutureWarning": "FuturoAviso",
			"ImportWarning": "ImportarAviso",
			"UnicodeWarning": "UnicodeAviso",
			"ResourceWarning": "RecursoAviso",
			"SystemExit": "SistemaSalida",
			"StopAsyncIteration": "ParaAsyncIteración",
			"StopIteration": "ParaIteración",
			"KeyboardInterrupt": "TecladoInterruptado",
			"GeneratorExit": "GeneradorSalida",
			"BaseException": "BaseExcepción",
			"Exception": "Excepción",
			"all": "todo",
			"bin": "contenedor",
			"breakpoint": "punto_de_ruptura",
			"callable": "llamable",
			"compile": "compilar",
			"credits": "créditos",
			"delattr": "borraratri",
			"enumarate": "enumarar",
			"exec": "ejec",
			"exit": "salir",
			"filter": "filtro",
			"format": "formato",
			"getattr": "obteneratri",
			"hasattr": "teneratri",
			"help": "ayudar",
			"input": "entrada",
			"isinstance": "escaso",
			"issubclass": "essubclase",
			"len": "lar",
			"license": "licencia",
			"locals": "locales",
			"map": "mapa",
			"memoryview": "memoriavista",
			"next": "siguiente",
			"open": "abrir",
			"pow": "pot",
			"print": "imprimir",
			"quit": "dejar",
			"range": "rango",
			"reload": "recargar",
			"reversed": "invertido",
			"round": "redondear",
			"setattr": "poneratri",
			"sorted": "ordenado",
			"sum": "suma",
			"zip": "comprimir",
			"file": "archivo",
			"reduce": "reducir",
			"intern": "pasante",
			"raw_input": "entrada_sin_procesar",
			"basestring": "baseguirnalda",
			"string": "guirnalda",
			"execfile": "ejecarchivo",
			"long": "largo",
			"xrange": "xrango",
			"bytearray": "matrizdebytes",
			"classmethod": "métododeclase",
			"complex": "complejo",
			"dict": "dicc",
			"float": "flotador",
			"frozenset": "conjuntocongelado",
			"int": "núm",
			"list": "lista",
			"property": "propiedad",
			"set": "conjunto",
			"slice": "rebanar",
			"staticmethod": "métodoestático",
			"str": "guir",
			"tuple": "tupla",
			"type": "tipo",
			"super": "súper",
			"add": "añadir",
			"aenter": "aentrar",
			"aexit": "asalir",
			"call": "llamar",
			"ceil": "techo",
			"coerce": "coaccionar",
			"contains": "contener",
			"copy": "copia",
			"deepcopy": "copiaprofunda",
			"delitem": "borrarartículo",
			"delslice": "borrarparte",
			"enter": "entrar",
			"floor": "piso",
			"floordiv": "pisodiv",
			"get": "obtener",
			"getattribute": "obteneratributo",
			"getinitargs": "obtenerparámetrosiniciales",
			"getitem": "obtenerartículo",
			"getnewargs": "obtenerparámetrosnuevos",
			"getslice": "obtenerparte",
			"getstate": "obtenerestado",
			"iadd": "iañadir",
			"iand": "iy",
			"ifloordiv": "ipisodiv",
			"ilshift": "iizqmover",
			"index": "índice",
			"init": "inicializar",
			"instancecheck": "casochequeo",
			"invert": "invertir",
			"ipow": "ipot",
			"irshift": "idmover",
			"itruediv": "idivverdadero",
			"lshift": "izqmover",
			"missing": "perdido",
			"new": "neuvo",
			"rdiv": "ddiv",
			"rdivmod": "divmod",
			"nonzero": "nocero",
			"rand": "azar",
			"reduce_ex": "reducir_ex",
			"rfloordiv": "dpisodiv",
			"rlshift": "dizqmover",
			"rpow": "dpot",
			"rrshift": "ddmover",
			"rshift": "dmover",
			"rsub": "dsub",
			"rtruediv": "ddivverdadero",
			"rxor": "dxor",
			"rmatmul": "dmatmul",
			"setitem": "ponerartículo",
			"setslice": "ponerparte",
			"setstate": "ponerestado",
			"sizeof": "tamañode",
			"rmod": "dmod",
			"rmul": "dmul",
			"ror": "dor",
			"subclasscheck": "subclasechequeo",
			"truediv": "divverdadero",
			"init_subclass": "subclase_initializar",
			"set_name": "poner_nombre",
			"fspath": "fscamino",
			"prepare": "preparar",
			"builtins": "incorporados",
			"class_getitem": "clase_obtenerartículo",
			"code": "código",
			"debug": "depurar",
			"defaults": "los_valores_por_defecto",
			"kwdefaults": "kw_los_valores_por_defecto",
			"members": "miembros",
			"metaclass": "metaclase",
			"methods": "métodos",
			"module": "módulo",
			"mro_entries": "mro_entradas",
			"name": "nombre",
			"post_init": "post_inicial",
			"signature": "firma",
			"slots": "ranuras",
			"subclasses": "subclases",
			"version": "versión",
			"weakref": "débilref",
			"wrapped": "envuelto",
			"annotations": "anotaciones",
			"classcell": "clasecelda",
			"spec": "espec",
			"path": "camino",
			"package": "paquete",
			"future": "futuro",
			"traceback": "localizaratrás",
			"NOTE": "NOTAR",
			"HACK": "HACKEAR",
			"FIXME": "ARRELGARME",
			"BUG": "BICHO",
			"TODO": "HACER",
			"__main__": "__principal__",
		};
		// variable regex
		let varReg1  = new RegExp(/([a-zA-Z_]+)=(?!(\w+'|'))/, "gm");
		let varReg2 = new RegExp(/([a-zA-Z_]+\s)=/, "gm");

		// string regex
		let tripleQuoteReg = new RegExp(/"""([^"]*)"""/, 'gm');
		let singleReg = new RegExp(/'(.+?)'/, 'gm');
		let doubleReg = new RegExp(/\"(.+?)\"/, "gm");

		// function name regex
		let funcReg = new RegExp(/\s(\w+)\(/, "gm");

		// comments regex
		let commentReg = new RegExp(/#(.*)/, "gm");

		// import library regex
		let importLibReg = new RegExp(/import\s(.+)/, "gm");
		let fromLibReg = new RegExp(/from\s(.+)(?=\simport)/, "gm");

		// dotted function regex
		let dottedFuncReg = new RegExp(/\.(\w+)\(/, "gm");


		// parse python file, getting each type of expression
		let variablesNoSpace = new Set(documentText.match(varReg1));
		let variablesNoSpaceArr = Array.from(variablesNoSpace);
		let variablesSpace = new Set(documentText.match(varReg2));
		let variablesSpaceArr = Array.from(variablesSpace);

		// let singleQuotes = new Set(documentText.match(singleReg));
		// let singleQuotesArr = Array.from(singleQuotes);
		// console.log(singleQuotesArr);
		let doubleQuotes = new Set(documentText.match(doubleReg));
		let doubleQuotesArr = Array.from(doubleQuotes);
		let tripleQuotes: any = [];
		tripleQuotes = documentText.match(tripleQuoteReg);
		
		let functionNames = new Set(documentText.match(funcReg));
		let functionNamesArray = Array.from(functionNames);
		let functionNamesArr: string[] = [];
		for(let x = 0; x < functionNamesArray.length; x++) {
			if(functionNamesArray[x].includes('str')) {
				continue;
			}
			functionNamesArr.push(functionNamesArray[x].slice(0, functionNamesArray[x].length - 1));
		}
		functionNamesArr = variableParse(functionNamesArr, []);

		let comments = documentText.match(commentReg);
		

		let importStrings = new Set(documentText.match(importLibReg));
		let importStringsArr = Array.from(importStrings);
		for(let x = 0; x < importStringsArr.length; x++) {
			let arr = importStringsArr[x].split(" ");
			importStringsArr[x] = arr[1].replace("_", "");
		}
		let fromStrings = new Set(documentText.match(fromLibReg));
		let fromStringsArr = Array.from(fromStrings);
		for(let x = 0; x < fromStringsArr.length; x++) {
			let arr = fromStringsArr[x].split(" ");
			fromStringsArr[x] = arr[1].replace("_", "");
		}

		// functions of the form: .functionName()
		let dottedFuncSet = new Set(documentText.match(dottedFuncReg));
		let dottedFuncArr = Array.from(dottedFuncSet);
		for(let x = 0; x < dottedFuncArr.length; x++) {
			dottedFuncArr[x] = dottedFuncArr[x].slice(1, dottedFuncArr[x].length - 1);
		}
		console.log(dottedFuncArr);

		let variableList: any = [];

		let noSpaceVars = variableParse(variablesNoSpaceArr, []);
		let spaceVars = variableParse(variablesSpaceArr, []);

		// variable list now has all var names
		noSpaceVars?.forEach((elem) => {
			variableList.push(elem);
		});
		spaceVars?.forEach((elem) => {
			variableList.push(elem);
		});

		// translate variable names
		let variableFinalArr: any[] = [];
		let variablesTranslated = translate(variableList, {to: 'es'}).then( (res: any) => {
			for(let x = 0; x < res.length; x++) {
				res[x] = res[x].replace(/ /g, '_').toLowerCase();
			}
			variableFinalArr = res;
		});

		// for(let x = 0; x < singleQuotesArr.length; x++) {
		// 	if(singleQuotesArr[x].includes('https://') || (singleQuotesArr[x].includes('&') && singleQuotesArr[x].includes('='))) {
		// 		singleQuotesArr.splice(x, 1);
		// 	}
		// }

		for(let x = 0; x < doubleQuotesArr.length; x++) {
			if(doubleQuotesArr[x] === '"""') {
				doubleQuotesArr.splice(x, 1);
			}
			else {
				doubleQuotesArr[x] = doubleQuotesArr[x].replace(/"/g, "");
			}
		}
		let doubleFinalArr: any[] = [];
		let doubleQuotesTranslated = translate(doubleQuotesArr, {to: 'es'}).then((res:any) => {
			doubleFinalArr = res;
		});;
		
		let tripleFinalArr: any[] = [];
		let tripleQuotesTranslated = translate(tripleQuotes, {to: 'es'}).then((res:any) => {
			tripleFinalArr = res;
		});

		let functionsFinalArr: any[] = [];
		let functionsTranslated = translate(functionNamesArr, {to: 'es'}).then( (res: any) => {
			for(let x = 0; x < res.length; x++) {
				res[x] = res[x].replace(/ /g, '_').toLowerCase();
			}
			functionsFinalArr = res;
		});

		let commentsFinalArr: any[] = [];
		let commentsTranslated = translate(comments, {to: 'es'}).then((res:any) => {
			commentsFinalArr = res;
		});

		let importsFinalArr: any[] = [];
		let importsTranslated = translate(importStringsArr, {to: 'es'}).then((res:any) => {
			for(let x = 0; x < res.length; x++) {
				res[x] = res[x].replace(/ /g, '_').toLowerCase();
			}
			importsFinalArr = res;
		});

		let fromsFinalArr: any[] = [];
		let fromsTranslated = translate(fromStringsArr, {to: 'es'}).then((res:any) => {
			for(let x = 0; x < res.length; x++) {
				res[x] = res[x].replace(/ /g, '_').toLowerCase();
			}
			fromsFinalArr = res;
		});

		let dottedFinalArr: any[] = [];
		let dottedTranslated = translate(dottedFuncArr, {to: 'es'}).then( (res: any) => {
			for(let x = 0; x < res.length; x++) {
				res[x] = res[x].replace(/ /g, '_').toLowerCase();
			}
			dottedFinalArr = res;
			console.log(dottedFinalArr);
		});

		const promises = [variablesTranslated, doubleQuotesTranslated, tripleQuotesTranslated, 
						  functionsTranslated, commentsTranslated, importsTranslated, fromsTranslated, dottedTranslated];

		Promise.allSettled(promises).then((results) => {
			if(results[2].status === 'fulfilled') {
				for(let u = 0; u < tripleQuotes.length; u++) {
					let quoteTranslated = tripleFinalArr[u].slice(3);
					quoteTranslated = quoteTranslated.slice(3, quoteTranslated.length - 4);
					documentText = replaceAll(documentText, tripleQuotes[u], '"""' + quoteTranslated + '"""');
				}
			}
			if(results[4].status === 'fulfilled' && comments !== null) {
				for(let u = 0; u < comments.length; u++) {
					documentText = replaceAll(documentText, comments[u], commentsFinalArr[u]);
				}
			}
			if(results[1].status === 'fulfilled') {
				for(let u = 0; u < doubleQuotesArr.length; u++) {
					if(doubleQuotesArr[u] !== "__main__") {
						documentText = replaceAll(documentText, doubleQuotesArr[u], doubleFinalArr[u]);
					}
					else {
						documentText = replaceAll(documentText, doubleQuotesArr[u], "__principal__");
					}
				}
			}
			if(results[0].status === 'fulfilled') {
				console.log(variablesNoSpaceArr);
				console.log(variableFinalArr);
				for(let u = 0; u < variablesNoSpaceArr.length; u++) {
					if(variablesNoSpaceArr[u].slice(0, variablesNoSpaceArr[u].length - 2) !== "__name__") {
						documentText = replaceAll(documentText, variablesNoSpaceArr[u].slice(0, variablesNoSpaceArr[u].length - 1), variableFinalArr[u]);
					}
					else {
						documentText = replaceAll(documentText, variablesNoSpaceArr[u].slice(0, variablesNoSpaceArr[u].length - 1), variableFinalArr[u] + "__");
					}
				}
				for(let u = 0; u < variablesSpaceArr.length; u++) {
					if(variablesSpaceArr[u].slice(0, variablesSpaceArr[u].length - 2) !== "__name__") {
						documentText = replaceAll(documentText, variablesSpaceArr[u].slice(0, variablesSpaceArr[u].length - 2), variableFinalArr[u + variablesNoSpaceArr.length]);
					}
					else {
						documentText = replaceAll(documentText, variablesSpaceArr[u].slice(0, variablesSpaceArr[u].length - 2), variableFinalArr[u + variablesNoSpaceArr.length] + "__");
					}
				}
			}
			if(results[3].status === 'fulfilled') {
				for(let u = 0; u < functionNamesArray.length; u++) {
					documentText = replaceAll(documentText, functionNamesArray[u].slice(0, functionNamesArray[u].length), " " + functionsFinalArr[u] + "(");
				}
				
			}
			if(results[5].status === 'fulfilled') {
				for(let u = 0; u < importStringsArr.length; u++) {
					documentText = replaceAll(documentText, importStringsArr[u], importsFinalArr[u]);
				}
			}
			if(results[6].status === 'fulfilled') {
				for(let u = 0; u < fromStringsArr.length; u++) {
					documentText = replaceAll(documentText, fromStringsArr[u], fromsFinalArr[u]);
				}
			}

			if(results[7].status === 'fulfilled') {
				for(let u = 0; u < dottedFuncArr.length; u++) {
					documentText = replaceAll(documentText, dottedFuncArr[u], dottedFinalArr[u]);
				}
			}

			// replace reserved words 
			// let textArr = documentText.split(" ");
			const keysRough = Object.keys(spanKeyWordDict);
			const keys = keysRough.sort((a, b) => b.length - a.length);
			

			for(let u = 0; u < keys.length; u++) {
				let re = new RegExp("\\b" + keys[u] + "\\b", "g");
				if(re.test(documentText)) {
					documentText = documentText.replace(re, spanKeyWordDict[keys[u]]);
				}
			}

			
		}).then(() => {
			console.log(documentText);
			
			create(documentText);
		});
	
		
	}
}

function create(inputText: string) {
	try {
	  // create the directory
	  let currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.uri.path;
	  let expand = currentlyOpenTabfilePath?.split("/");
	  const filename = "esp_" + expand?.pop();
	
		if(expand && expand.length > 0) {
			// fs.mkdirSync(expand?.join("/"));

			let absoluteDuckPath = expand.join("/");
	  
			const fullpath = path.join(absoluteDuckPath, filename);
		
			fs.writeFileSync(fullpath, inputText, 'utf8');
			var openPath = vscode.Uri.parse("file://" + fullpath); //A request file path
			vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc);
			});
		}
	  
	} 
	catch (err) {
	  // log?
	  console.log('Error creating files');
  
	  throw err;
	}
  }

function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str:string, find:any, replace:string) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}


function variableParse(inputVars: string[], varList: string[]) {
	for(let y = 0; y < inputVars.length; y++) {
		var item = inputVars[y].replace('=', '').trim();
		var positions = [];
		for(var i=0; i<item.length; i++){
			if(item[i].match(/[A-Z]/) !== null){
				positions.push(i);
			}
		}
		
		var input = item;
		if(positions.length === 0) {
			if(item.includes('_')) {
				input = item.replace(/_/g, " ");
			}
		}
		
		else if (positions.length >= 1) {
			input = item;
			for(const [index, element] of positions.entries()) {
				let indx;
				if (index > 0) {
					indx = element + index;
				}
				else {
					indx = element;
				}
				
				input = input.slice(0, indx) + " " + input.slice(indx);
			}
			
		}
		else {
			input = item;
		}

		if(input.length > 0) {
			varList.push(input);
		}
	}
	return varList;
}

// this method is called when your extension is deactivated
export function deactivate() {}
