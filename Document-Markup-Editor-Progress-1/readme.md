# Document-Markup-Editor

## About
PDF is one of the more popular formats on the Internet for interchanging documents, it's versatile and everywhere.

Abound as well are the PDF Readers, even major Web Browsers have embedded Viewers.

What's less abundant however, are free, locally running Editors, with a simple and intuitive User Interface, for editing a PDF Document.

## Design
This Web Application will rely on a locally-loaded written-from-scratch <i>javascript</i> "program"/library to parse the binary PDF format.

HTML (and CSS) will then be used; for its structuring and presentational capabilities, along with User Interaction, to mark-up the recently read content. Effectively Editing the PDF.

The Markup will then be converted back to PDF for Final Output.

## Implementation
- <code>rules.txt</code> will hold a basic set of rules to parse the format as per the released Specification [https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf)

- <code>porcess.js</code> has to parse the format of <code>rules.txt</code> which has a yet not defined syntax.
