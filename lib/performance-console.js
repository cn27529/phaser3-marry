function performanceConsole() {
  const t = performance.timing;

  console.log('%c頁面總耗時如下：', 'font-size: 18px; font-weight: bold; color: #E65100');

  const pageload_time = t.loadEventStart - t.navigationStart; // 頁面加載的時間
  console.log(`頁面加載的時間：${pageload_time} ms`);

  const dns_time = t.domainLookupEnd - t.domainLookupStart; // 域名解析的時間
  console.log(`域名解析的時間：${dns_time} ms`);

  const tcp_time = t.connectEnd - t.connectStart; // TCP連接的時間
  console.log(`TCP連接的時間：${tcp_time} ms`);

  const ttfb_time = t.responseStart - t.navigationStart; // 讀取頁面第一個字節之前的時間
  console.log(`讀取頁面第一個字節之前的時間：${ttfb_time} ms`);

  const response_time = t.requestStart - t.responseEnd; // 發送request後到responsive完成的時間
  console.log(`發送request後到responsive完成的時間：${ttfb_time} ms`);


  // 抓頁面上的每一個resource
  const srcArray = window.performance.getEntries();
  let dataArray = []; // forEach後的資料
  let endArray; // 排序後的資料
  srcArray.forEach((s) => {
    if(s.name.indexOf('paint') === -1) {
      let name = s.name;
      let start = s.responseStart;
      let end = s.responseEnd;
      let duration = end - start;
      dataArray.push({
        file_name: name,
        need_time: duration
      });
    }
  });

  // 倒序排列
  endArray = dataArray.sort((a, b) => {
    return b.need_time > a.need_time ? 1 : -1;
  });

  // console出來
  console.log('');
  console.log('%c各檔案耗時如下：', 'font-size: 18px; font-weight: bold; color: #E65100');
  console.table(endArray);
};

window.onload = function() {
  performanceConsole();
}