import { useTitle } from "@/ahooks";

function UseTitlePage(){
  useTitle("我设置了title", { restoreOnUnmount: true })

  return (
    <div>
      <p>Set title of the page.</p>
    </div>
  )
}

export default UseTitlePage;