import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export const generatePdfFromScenePreviews = async (previews: string[]) => {
  return new Promise<void>(async (resolve) => {
    const PDF_WIDTH = 1600
    const PDF_HEIGHT = 900

    // Create hidden container
    const container = document.createElement("div")
    container.style.position = "absolute"
    container.style.top = "0"
    container.style.left = "0"
    container.style.width = `${PDF_WIDTH}px`
    container.style.height = `${PDF_HEIGHT * previews.length}px`
    container.style.zIndex = "-1"
    container.style.opacity = "0"
    container.style.pointerEvents = "none"
    document.body.appendChild(container)

    const imageElements: HTMLImageElement[] = []

    for (const src of previews) {
      const img = document.createElement("img")
      img.src = src
      img.style.width = `${PDF_WIDTH}px`
      img.style.height = `${PDF_HEIGHT}px`
      img.style.display = "block"
      container.appendChild(img)
      imageElements.push(img)
    }

    // Wait for all images to load
    await Promise.all(
      imageElements.map(
        (img) =>
          new Promise((res, rej) => {
            img.onload = res
            img.onerror = rej
          })
      )
    )

    // Create PDF with pixel units and set exact page size
    const pdf = new jsPDF({
      orientation: "l",
      unit: "px",
      format: [PDF_WIDTH, PDF_HEIGHT],
    })

    for (let i = 0; i < imageElements.length; i++) {
      const canvas = await html2canvas(imageElements[i], {
        width: PDF_WIDTH,
        height: PDF_HEIGHT,
        scale: 1, // scale 1 because we're controlling dimensions directly
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")

      if (i !== 0) pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, 0, PDF_WIDTH, PDF_HEIGHT)
    }

    document.body.removeChild(container)
    pdf.save("presentation.pdf")
    resolve()
  })
}
