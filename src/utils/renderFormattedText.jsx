
const TAG_COMPONENTS = {
  b: "strong",
  i: "em",
  u: "u",
  code: "code",
  bullet: ({ children, ...props }) => (
    <span 
      style={{ 
        display: "inline-block", 
        width: "100%", 
        paddingLeft: "1.5em", 
        textIndent: "-1em" 
      }} 
      {...props}
    >
      • {children}
    </span>
  ),
  indent: (props) => <span style={{ paddingLeft: "2em" }} {...props} />,
  br: "br"
};

// Função recursiva que converte nós do DOM do browser em componentes React
const domToReact = (node, index = 0) => {
  // 1. Se for um nó de texto puro, retorna apenas a string
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  // 2. Se for um nó de elemento (uma tag)
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase();
    const Component = TAG_COMPONENTS[tagName];

    // Se a tag que o utilizador usou estiver no nosso dicionário
    if (Component) {
      // Converte recursivamente todos os filhos deste nó (suporta aninhamento infinito!)
      const children = Array.from(node.childNodes).map((child, i) => domToReact(child, i));
      
      return (
        <Component key={`${tagName}-${index}`}>
          {children.length > 0 ? children : null}
        </Component>
      );
    }
    
    // Se for uma tag desconhecida, ignora a tag mas processa o que está lá dentro
    return Array.from(node.childNodes).map((child, i) => domToReact(child, i));
  }

  return null;
};

export const renderFormattedText = (text = "") => {
  if (!text) return "";

  // Usamos o DOMParser nativo do browser para ler a string como HTML/XML estruturado
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${text}</body>`, "text/html");
  const body = doc.body;

  // Converte os nós filhos do body para elementos React
  return Array.from(body.childNodes).map((node, index) => domToReact(node, index));
};