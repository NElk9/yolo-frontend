export default function Footer() {
  return (
    <div
      className={
        'flex flex-col justify-center items-center gap-1 pt-[100px] pb-14 bg-gradient-to-b from-[#6E56FF]/10 to-[#6E56FF]/20 text-[#666666] text-[12px]'
      }
    >
      <p>Copyright © 2025 泪水打湿猪脚饭团队 All Rights Reserved.</p>
      <p>团队成员：章铭宇, 沈欣妍, 龚萍萍, 谈馨, 王风清扬</p>
      <p>比赛项目：基于计算机视觉的授信审批印章真伪鉴别模型构建与运用</p>
      <p>
        联系我们：
        <u>
          <a href={'mailto:1181485048@qq.com'}>1181485048@qq.com</a>
        </u>
      </p>
    </div>
  )
}
