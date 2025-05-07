export function getPages(pages){
  let childrenRoutes = [];
  // 遍历 pages 对象
  for (const path in pages) {
    // 提取文件名，例如从 '../play/useLatest.tsx' 提取 'useLatest'
    const fileName = path.split('/').pop()?.replace('.tsx', '');
    if (fileName) {
      const PageComponent = pages[path]?.default;
      childrenRoutes.push({
        path:`${fileName}` ,
        element: <PageComponent />
      });
    }
  }

  return childrenRoutes;
}