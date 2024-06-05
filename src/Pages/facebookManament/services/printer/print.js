import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { toJpeg, toCanvas } from 'html-to-image'

const downloadImage = async () => {
  const toImgArea = document.getElementById('content')
  const dataUrl = await toJpeg(toImgArea,{pixelRatio: 7})
  return dataUrl
}

export const printWhb = (printService) => {

  const paper_size = [80, 297]
  let pdf = new jsPDF('p', 'mm', paper_size)
  const img = downloadImage()
  img.then(function (dataUrl) {
    // pdf.addImage(dataUrl, 'jpeg', -240, 0,paper_size[0]*7, 0, undefined, 'FAST')
    pdf.addImage(dataUrl, 'jpeg', 12, 0,paper_size[0]*0.7, 0, undefined, 'FAST')
    let base = pdf.output('datauristring').replace('data:application/pdf;filename=generated.pdf;base64,', '')
    // pdf.save();
    printService.submit({
      'type': 'INVOICE',
      'url': 'invoice.pdf',
      'file_content': base
    })
  })
  //
}

export const printWhb1 = async (contents, printService) => {

  var setting = () => {
    let size = '14px'
    let blank = 200
    let text = 'Cường'
    return { 'print_size': size, 'print_blank': blank, 'print_text': text }
  }
  var new_contents = '<div style="text-align:center;font-family:Arial;margin-top:-11.5px;"><p class="text" style="margin:0; text-transform: uppercase; font-weight:bold"></p><p style="margin:0;font-size:21px;"><b>#4702046</b></p><p style="margin:0;font-size:21px;"><b>Anh Hai</b></p><p style="margin:0;font-size:21px;"><b>SĐT: 0917079559 (Vina)</b></p><p style="margin:0;font-size:15px;"></p><p style="margin:0;font-size:15px;">0917079559 | 09129090220 | 1213123 | 0917078558 | ago | anh 3 | aaaaaa | 1111111 | 131232 | 12312312332 | aaaaa | Alo 123 | 123asd | log | abc123 | 123123 | 1111111 | GÉC GOOOOOOOOO | gsc gô | let\'s go | Xổ | other | văn hóa | thiên nhiên | log | Fix | Báo thủ | Báo | alo | đừng block | oke | okela123 | alolo | Đông chí Tl lên đồ | Em ơi | alo alo 123 | ủa alo | cay vccc | dìa | alalala | oke 123 | abc 123 | anh hai | ok123 | 123 | 1 | 11111111111 | cancss | oke | abc | 11111 | test print | 1 | test | abcbaccabcabcabcabcabcabcabcabcabacacbcabcabca | okeooooo | OKela 123 | abc 123 | 123213 | 11123123 | ?123 | 1111111 | aloha | oke;aaaaaa | 121212121 | 123123 | okela | 111111 | alo.</p><p style="margin:0;font-size:13px;">22/12/22 - 15:27</p><div class="blank" style="margin-top: 0px; height: 100px; border: 1px solid rgb(163, 163, 163);"></div></div>'
  var iframe = document.createElement('iframe')
  document.body.appendChild(iframe)

  setTimeout(function () {

    var iframedoc = iframe.contentDocument || iframe.contentWindow.document
    iframedoc.body.innerHTML = new_contents
    iframedoc.body.style.overflow = 'hidden'
    iframedoc.body.style.fontSize = setting.print_size
    // if(setting.print_text != ''){
    //   iframedoc.body.getElementsByClassName('text')[0].innerHTML = setting.print_text;
    // }
    //
    // if(setting.print_blank > 0){
    //   iframedoc.body.getElementsByClassName('blank')[0].style.height = setting.print_blank;
    //   iframedoc.body.getElementsByClassName('blank')[0].style.border = '1px solid #a3a3a3';
    // }

    // html2canvas 1.0.0 rc5
    html2canvas(iframedoc.body, { scale: 7, useCORS: true }).then(function (canvas) {
      console.log(iframedoc.body, canvas)
      // XP-80C DEFAULT PAPER SIZE
      let paper_size = [80, 297]
      let img = canvas.toDataURL('image/jpeg')
      let pdf = new jsPDF('p', 'mm', paper_size)
      pdf.addImage(img, 'jpeg', 0, 0, paper_size[0], 0, undefined, 'FAST')
      let base = pdf.output('datauristring').replace('data:application/pdf;filename=generated.pdf;base64,', '')
      // pdf.save();
      printService.submit({
        'type': 'INVOICE',
        'url': 'invoice.pdf',
        'file_content': base
      })
      document.body.removeChild(iframe)
    })

  }, 10)
}

export const printFrame = (content) => {
  let frame = document.createElement('iframe')
  frame.name = 'frame'
  frame.style.position = 'absolute'
  frame.style.top = '-1000000px'
  document.body.appendChild(frame)
  const frameDoc = frame.contentWindow
    ? frame.contentWindow
    : frame.contentDocument.document
      ? frame.contentDocument.document
      : frame.contentDocument
  frameDoc.document.open()
  frameDoc.document.write(content)
  frameDoc.document.close()
  window.frames.frame.focus()
  window.frames.frame.print()
  document.body.removeChild(frame)
}
