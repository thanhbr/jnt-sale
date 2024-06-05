export const convertItemDefault = (item) => {
  if(item) {
    if(item.indexOf('{cod}') !== -1) {
      item = item.replace(/{cod}/gi, '100,000');
    }
    if(item.indexOf('{shipping_unit}') !== -1) {
      item = item.replace(/{shipping_unit}/gi, 'J&T EXPRESS');
    }
    if(item.indexOf('{tracking_barcode}') !== -1) {
      item = item.replace(/{tracking_barcode}/gi, '<img src="/img/printTemplate/bar-code-jnt.png">');
    }
    // if(item.indexOf('{tracking_qrcode}') !== -1) {
    //   item = item.replace(/{tracking_qrcode}/gi, '<img style="max-width:150px; max-height:150px" src="../../my-assets/image/qrcode_test.png">');
    // }
    if(item.indexOf('{tracking_number}') !== -1) {
      item = item.replace(/{tracking_number}/gi, 'J&T0000001');
    }
    if(item.indexOf('{product_name}') !== -1) {
      item = item.replace(/{product_name}/gi, 'Áo sơ mi');
    }
    if(item.indexOf('{quantity}') !== -1) {
      item = item.replace(/{quantity}/gi, '1');
    }
    if(item.indexOf('{total_quantity}') !== -1) {
      item = item.replace(/{total_quantity}/gi, '1');
    }
    if(item.indexOf('{shipment_note}') !== -1) {
      item = item.replace(/{shipment_note}/gi, 'Hàng dễ vỡ');
    }
    if(item.indexOf('{order_code}') !== -1) {
      item = item.replace(/{order_code}/gi, '0000001');
    }
    if(item.indexOf('{fee_payers}') !== -1) {
      item = item.replace(/{fee_payers}/gi, 'Người gửi trả phí');
    }
    if(item.indexOf('{receiver_name}') !== -1) {
      item = item.replace(/{receiver_name}/gi, "Nguyễn Văn A");
    }
    if(item.indexOf('{receiver_phone}') !== -1) {
      item = item.replace(/{receiver_phone}/gi, "0948888888");
    }
    if(item.indexOf('{receiver_address}') !== -1) {
      item = item.replace(/{receiver_address}/gi, "107 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TP Hồ Chí Minh");
    }
    if(item.indexOf('{brand_code}') !== -1) {
      item = item.replace(/{brand_code}/gi, "222");
    }
    if(item.indexOf('{postoffice_code}') !== -1) {
      item = item.replace(/{postoffice_code}/gi, "D01");
    }
    if(item.indexOf('{area_code}') !== -1) {
      item = item.replace(/{area_code}/gi, "HAN");
    }
    if(item.indexOf('{weight}') !== -1) {
      item = item.replace(/{weight}/gi, "1");
    }
    if(item.indexOf('{own_order_code}') !== -1) {
      item = item.replace(/{own_order_code}/gi, "P_00001");
    }

    if(item.indexOf('{line_price}') !== -1) {
      item = item.replace(/{line_price}/gi, "100,000");
    }
    if(item.indexOf('{line_amount}') !== -1) {
      item = item.replace(/{line_amount}/gi, "100,000");
    }
    if(item.indexOf('{date_print}') !== -1) {
      item = item.replace(/{date_print}/gi, '20/10/2020');
    }

    if(item.indexOf('{total}') !== -1) {
      item = item.replace(/{total}/gi, "100,000");
    }
    if(item.indexOf('{discount}') !== -1) {
      item = item.replace(/{discount}/gi, "0");
    }
    if(item.indexOf('{payment_customer}') !== -1) {
      item = item.replace(/{payment_customer}/gi, '100,000');
    }
    if(item.indexOf('{money_return}') !== -1) {
      item = item.replace(/{money_return}/gi, '100,000');
    }

    // shop
    if(item.indexOf('{store_logo}') !== -1) {
      item = item.replace(/{store_logo}/gi, '<img style="max-width:100%; margin-top: 8px;" src="/img/logo.png">');
    }
    if(item.indexOf('{tracking_qrcode}') !== -1) {
      item = item.replace(/{tracking_qrcode}/gi, '<img src="/img/printTemplate/qr.png">');
    }
    // if (store_logo != 'undefined') {
    //   if(item.indexOf('{store_logo}') != -1) {
    //     item = item.replace(/{store_logo}/gi, '<img style="max-width:100%" src="../../assets/image/uploads/logo/'+store_logo+'">');
    //   }
    // } else {
    //   item = item.replace(/{store_logo}/gi, '');
    // }
    // if(item.indexOf('{sender_name}') != -1) {
    //   item = item.replace(/{sender_name}/gi, fullname);
    // }
    // if(item.indexOf('{sender_phone}') != -1) {
    //   item = item.replace(/{sender_phone}/gi, phone);
    // }
    // if(item.indexOf('{sender_address}') != -1) {
    //   item = item.replace(/{sender_address}/gi, address);
    // }
    if(item.indexOf('{store_name}') !== -1) {
      item = item.replace(/{store_name}/gi, 'evoshop');
    }
    if(item.indexOf('{store_phone}') !== -1) {
      item = item.replace(/{store_phone}/gi, '028 7300 5688');
    }
    if(item.indexOf('{store_address}') !== -1) {
      item = item.replace(/{store_address}/gi, '107 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TP Hồ Chí Minh');
    }

    // Phiếu nhập kho
    if(item.indexOf('{stt}') !== -1) {
      item = item.replace(/{stt}/gi, 1);
    }
    if(item.indexOf('{product_code}') !== -1) {
      item = item.replace(/{product_code}/gi, 'A-SM01');
    }
    if(item.indexOf('{unit}') !== -1) {
      item = item.replace(/{unit}/gi, 'Cái');
    }
    if(item.indexOf('{warehouse_address}') !== -1) {
      item = item.replace(/{warehouse_address}/gi, '107 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TP Hồ Chí Minh');
    }
    if(item.indexOf('{invoice_number}') !== -1) {
      item = item.replace(/{invoice_number}/gi, 'HD10000');
    }
    if(item.indexOf('{price_vat}') !== -1) {
      item = item.replace(/{price_vat}/gi, '10,000');
    }

    if(item.indexOf('{warehouse}') !== -1) {
      item = item.replace(/{warehouse}/gi, 'Kho mặc định');
    }
    if(item.indexOf('{date_created}') !== -1) {
      item = item.replace(/{date_created}/gi, '20/07/2002');
    }

    if(item.indexOf('{creator}') !== -1) {
      item = item.replace(/{creator}/gi, 'Nguyễn Văn A');
    }
    if(item.indexOf('{price}') !== -1) {
      item = item.replace(/{price}/gi, '100,000');
    }
    if(item.indexOf('{amount_money}') !== -1) {
      item = item.replace(/{amount_money}/gi, '100,000');
    }
    if(item.indexOf('{total_money}') !== -1) {
      item = item.replace(/{total_money}/gi, '100,000');
    }
    if(item.indexOf('{type_receipt}') !== -1) {
      item = item.replace(/{type_receipt}/gi, 'Nhập kho');
    }
    if(item.indexOf('{convert_money}') !== -1) {
      item = item.replace(/{convert_money}/gi, 'Hai trăm nghìn đồng');
    }

    // Phieu kiem kho
    if(item.indexOf('{warehouse_name}') !== -1) {
      item = item.replace(/{warehouse_name}/gi, 'Kho mặc định');
    }
    if(item.indexOf('{code}') !== -1) {
      item = item.replace(/{code}/gi, 'SCC00001');
    }
    if(item.indexOf('{date_updated}') !== -1) {
      item = item.replace(/{date_updated}/gi, '20/10/1988');
    }
    if(item.indexOf('{reason}') !== -1) {
      item = item.replace(/{reason}/gi, 'Lý do');
    }
    if(item.indexOf('{note}') !== -1) {
      item = item.replace(/{note}/gi, 'Sản phẩm tồn kho');
    }
    if(item.indexOf('{amount_adjusted}') !== -1) {
      item = item.replace(/{amount_adjusted}/gi, '1');
    }
    if(item.indexOf('{amount_difference}') !== -1) {
      item = item.replace(/{amount_difference}/gi, '1');
    }
    if(item.indexOf('{item_reason}') !== -1) {
      item = item.replace(/{item_reason}/gi, 'Lý do');
    }
    if(item.indexOf('{status}') !== -1) {
      item = item.replace(/{status}/gi, 'Trạng thái');
    }
    if(item.indexOf('{inventory}') !== -1) {
      item = item.replace(/{inventory}/gi, '10');
    }
    if(item.indexOf('{number_of_packages}') !== -1) {
      item = item.replace(/{number_of_packages}/gi, '1');
    }

    // Phiếu thu
    if(item.indexOf('{receipt_code}') !== -1) {
      item = item.replace(/{receipt_code}/gi, 'PT00000001');
    }
    if(item.indexOf('{object_name}') !== -1) {
      item = item.replace(/{object_name}/gi, 'Nguyễn Văn A');
    }
    if(item.indexOf('{object_address}') !== -1) {
      item = item.replace(/{object_address}/gi, '199 Điện Biên Phủ, phường 15, quận Bình Thạnh');
    }
    if(item.indexOf('{object_phone}') !== -1) {
      item = item.replace(/{object_phone}/gi, '0948888888');
    }
    if(item.indexOf('{amount}') !== -1) {
      item = item.replace(/{amount}/gi, '100,000');
    }
    if(item.indexOf('{amount_text}') !== -1) {
      item = item.replace(/{amount_text}/gi, 'Năm trăm nghìn');
    }
    if(item.indexOf('{payment_method_name}') !== -1) {
      item = item.replace(/{payment_method_name}/gi, 'Tiền mặt');
    }
    if(item.indexOf('{receipt_type}') !== -1) {
      item = item.replace(/{receipt_type}/gi, 'Tự động');
    }
    if(item.indexOf('{object_type}') !== -1) {
      item = item.replace(/{object_type}/gi, 'Nhà cung cấp');
    }
    if(item.indexOf('{reference_code}') !== -1) {
      item = item.replace(/{reference_code}/gi, 'NH000001');
    }

    // Tiktok shop
    if(item.indexOf('{discount_seller}') !== -1) {
      item = item.replace(/{discount_seller}/gi, "0");
    }
    if(item.indexOf('{discount_platform}') !== -1) {
      item = item.replace(/{discount_platform}/gi, "0");
    }
    if(item.indexOf('{total_amount}') !== -1) {
      item = item.replace(/{total_amount}/gi, '100,000');
    }
    if(item.indexOf('{shipping_fee}') !== -1) {
      item = item.replace(/{shipping_fee}/gi, "0");
    }
    if(item.indexOf('{total_discount_seller}') !== -1) {
      item = item.replace(/{total_discount_seller}/gi, "0");
    }
    if(item.indexOf('{total_discount_platform}') !== -1) {
      item = item.replace(/{total_discount_platform}/gi, "0");
    }
    if(item.indexOf('{sku_name}') !== -1) {
      item = item.replace(/{sku_name}/gi, "M, Trắng");
    }
    if(item.indexOf('{sender_name}') !== -1) {
      item = item.replace(/{sender_name}/gi, "Nguyễn Văn A");
    }
    if(item.indexOf('{order_id}') !== -1) {
      item = item.replace(/{order_id}/gi, "123456");
    }
    if(item.indexOf('{order_id}') !== -1) {
      item = item.replace(/{order_id}/gi, "123456");
    }

    //  Chi tiết đơn đặt hàng
    if(item.indexOf('{customer_name}') !== -1) {
      item = item.replace(/{customer_name}/gi, "Nguyễn Văn A");
    }
    if(item.indexOf('{tt_account}') !== -1) {
      item = item.replace(/{tt_account}/gi, "Văn A");
    }
    if(item.indexOf('{customer_address}') !== -1) {
      item = item.replace(/{customer_address}/gi, "TP. Hồ Chí Minh");
    }
    if(item.indexOf('{customer_phone}') !== -1) {
      item = item.replace(/{customer_phone}/gi, "099999999");
    }
    if(item.indexOf('{order_status}') !== -1) {
      item = item.replace(/{order_status}/gi, "Đang giao hàng");
    }
    if(item.indexOf('{reason_cancel}') !== -1) {
      item = item.replace(/{reason_cancel}/gi, "Không có");
    }
    if(item.indexOf('{payment_method}') !== -1) {
      item = item.replace(/{payment_method}/gi, "COD");
    }
    if(item.indexOf('{shipping_partner}') !== -1) {
      item = item.replace(/{shipping_partner}/gi, "J&T Express");
    }
    if(item.indexOf('{billcode}') !== -1) {
      item = item.replace(/{billcode}/gi, "SADSADRQ");
    }
    if(item.indexOf('{shipping_option}') !== -1) {
      item = item.replace(/{shipping_option}/gi, "Giao tại nhà");
    }

    // TiktokShop
    if(item.indexOf('{sender_address}') !== -1) {
      item = item.replace(/{sender_address}/gi, "TP. Hồ Chí Minh");
    }
    if(item.indexOf('{sender_phone}') !== -1) {
      item = item.replace(/{sender_phone}/gi, "099999999");
    }
    if(item.indexOf('{dispatch_site}') !== -1) {
      item = item.replace(/{dispatch_site}/gi, "TTBR");
    }
    if(item.indexOf('{product_desc}') !== -1) {
      item = item.replace(/{product_desc}/gi, "Áo len mùa đông");
    }
    if(item.indexOf('{sub_bill_code}') !== -1) {
      item = item.replace(/{sub_bill_code}/gi, "QWERT");
    }
    if(item.indexOf('{qr_code}') !== -1) {
      item = item.replace(/{qr_code}/gi, `<img  src="/img/printTemplate/qr.png" alt="qr_default"/>`);
    }
    if(item.indexOf('{bar_code}') !== -1) {
      item = item.replace(/{bar_code}/gi, `<img  src="/img/printTemplate/bar-code.png" alt="barcode_default" style="max-height:100px"/>`);
    }
    if(item.indexOf('/my-assets/image/tiktok-full.png') !== -1) {
      item = item.replace('/my-assets/image/tiktok-full.png', '/img/printTemplate/tiktok-full.png');
    }
    if(item.indexOf('/my-assets/image/jnt-logo-png.png') !== -1) {
      item = item.replace('/my-assets/image/jnt-logo-png.png', '/img/printTemplate/jnt-logo.png');
    }

  }
  return item
}