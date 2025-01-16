
import { Outlet } from 'react-router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export function Component() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  )
}
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  )
}
// export default observer(App)
export default App
