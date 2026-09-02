import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/app.css'

const orders=[
 {id:'ORD202405130001',amount:'100.00',currency:'USDT',method:'微信支付',status:'已支付',tone:'green'},
 {id:'ORD202405130002',amount:'50.00',currency:'CNY',method:'支付宝',status:'处理中',tone:'blue'},
 {id:'ORD202405130003',amount:'200.00',currency:'CNY',method:'微信支付',status:'已支付',tone:'green'},
 {id:'ORD202405130004',amount:'300.00',currency:'CNY',method:'银行卡',status:'已取消',tone:'orange'},
 {id:'ORD202405130005',amount:'120.00',currency:'USDT',method:'USDT-ERC20',status:'已支付',tone:'teal'}
]

function Icon({children,className=''}){return <span className={'icon '+className}>{children}</span>}

function Header({toast}){
 return <header className="header">
   <div className="brand-row"><div className="brand">PayGate</div><div className="header-actions">
     <button className="header-btn" onClick={()=>toast('暂无新通知')}>♧<i/></button>
     <button className="header-btn" onClick={()=>toast('扫码功能')}</button>
   </div></div>
   <div className="merchant-row"><span>商户 A</span><span className="verified">✓</span><button className="switch" onClick={()=>toast('商户切换')}>⌄</button></div>
 </header>
}

function Balance({hidden,setHidden}){
 return <section className="balance-card">
   <div className="balance-head"><span>总资产（USDT）</span><button onClick={()=>setHidden(!hidden)}>{hidden?'○':'◉'}</button></div>
   <div className="balance-value">{hidden?'••••••':'10,245.32'}</div>
   <div className="balance-usd">≈ $10,245.32</div>
   <div className="balance-divider"/>
   <div className="balance-stats">
    {[
      ['可用余额','8,245.32','≈ $8,245.32'],['待结算','1,500.00','≈ $1,500.00'],
      ['今日收入','2,345.21','≈ $2,345.21'],['今日订单','152','笔']
    ].map((x,i)=><div key={i}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div>)}
   </div>
 </section>
}

function Payments({toast}) {
 return <section className="card"><div className="section-head"><h2>收款方式</h2><button className="link" onClick={()=>toast('打开收款方式管理')}>管理收款方式 ›</button></div>
   <div className="payment-grid">
    <Pay icon="微" tone="wechat" name="微信支付" toast={toast}/><Pay icon="支" tone="alipay" name="支付宝" toast={toast}/><Pay icon="▤" tone="bank" name="银行卡收款" toast={toast}/>
   </div>
 </section>
}
function Pay({icon,tone,name,toast}){return <button className="pay" onClick={()=>toast(name)}><span className={'pay-logo '+tone}>{icon}</span><strong>{name}</strong><em>已开启</em></button>}

function Chart(){
 return <section className="card chart-card"><div className="section-head"><h2>收入趋势（近7天）</h2><button className="period" onClick={()=>alert('近7天')}>近7天⌄</button></div>
   <div className="chart-wrap"><div className="y-axis"><span>4,000</span><span>3,000</span><span>2,000</span><span>1,000</span><span>0</span></div>
    <div className="chart"><div className="grid">{[1,2,3,4,5].map(i=><i key={i}/>)}</div>
     <svg viewBox="0 0 700 220" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2879f5" stopOpacity=".22"/><stop offset="1" stopColor="#2879f5" stopOpacity=".02"/></linearGradient></defs>
      <path d="M15 188L126 145L237 94L348 136L459 62L570 112L685 28L685 205L15 205Z" fill="url(#fill)"/>
      <polyline points="15,188 126,145 237,94 348,136 459,62 570,112 685,28" fill="none" stroke="#2879f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      {[['15','188'],['126','145'],['237','94'],['348','136'],['459','62'],['570','112'],['685','28']].map(([cx,cy])=><circle key={cx} cx={cx} cy={cy} r="5" fill="#fff" stroke="#2879f5" strokeWidth="3"/>)}
     </svg>
    </div>
   </div><div className="dates">{['05-07','05-08','05-09','05-10','05-11','05-12','05-13'].map(x=><span key={x}>{x}</span>)}</div>
 </section>
}

function Orders({openOrder}){
 return <section className="card orders"><div className="section-head"><h2>最新订单</h2><button className="link" onClick={()=>openOrder(orders[0])}>全部订单 ›</button></div>
   {orders.map(o=><button className="order-row" key={o.id} onClick={()=>openOrder(o)}>
    <span className={'pay-dot '+o.tone}>{o.method==='微信支付'?'微':o.method==='支付宝'?'支':o.method==='银行卡'?'▤':'₮'}</span>
    <span className="order-no">{o.id}</span><strong>{o.amount} <small>{o.currency}</small></strong><span>{o.method}</span><em className={o.status==='已支付'?'paid':o.status==='处理中'?'processing':'cancelled'}>{o.status}</em>
   </button>)}
 </section>
}

function Quick({toast}){return <section className="quick-grid">
 {[
  ['create','▤','创建订单','快速创建收款订单'],['qr','▦','收款二维码','展示收款二维码'],['link','↗','支付链接','分享收款链接'],['withdraw','▤','资金提现','提取到银行卡/钱包']
 ].map(x=><button className="quick" key={x[2]} onClick={()=>toast(x[2])}><span className={'quick-icon '+x[0]}>{x[1]}</span><strong>{x[2]}</strong><small>{x[3]}</small></button>)}
 </section>}

function OrderDetail({order,back}){
 return <div className="subpage"><div className="sub-head"><button onClick={back}>‹</button><h1>订单详情</h1></div>
  <div className="detail-status"><span className={'status-circle '+order.tone}>✓</span><b>{order.status}</b><small>订单状态</small></div>
  <section className="card detail-card"><div className="detail-amount">¥{order.amount}</div><div className="detail-currency">{order.currency}</div>
   {[['订单号',order.id],['支付方式',order.method],['创建时间','2026-05-13 10:30:21'],['支付时间',order.status==='已支付'?'2026-05-13 10:30:45':'—'],['手续费','¥1.00'],['实际到账','¥99.00']].map(x=><div className="detail-line" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}
  </section>
 </div>
}

function Placeholder({title,desc,back}){
 return <div className="subpage"><div className="sub-head"><button onClick={back}>‹</button><h1>{title}</h1></div><section className="card placeholder"><Icon className="placeholder-icon">◈</Icon><h2>{title}</h2><p>{desc}</p><button className="primary">继续建设</button></section></div>
}

function App(){
 const [tab,setTab]=useState('home'),[hidden,setHidden]=useState(false),[detail,setDetail]=useState(null),[toastMsg,setToastMsg]=useState('')
 const toast=t=>{setToastMsg(t);clearTimeout(window.__pg);window.__pg=setTimeout(()=>setToastMsg(''),1300)}
 const nav=(t)=>{setDetail(null);setTab(t);window.scrollTo({top:0,behavior:'smooth'})}
 if(detail) return <div className="app"><OrderDetail order={detail} back={()=>setDetail(null)}/>{toastMsg&&<div className="toast">{toastMsg}</div>}</div>
 const page = tab==='home'?<><Header toast={toast}/><main><Balance hidden={hidden} setHidden={setHidden}/><Payments toast={toast}/><Chart/><Orders openOrder={setDetail}/><Quick toast={toast}/></main></>:
  tab==='orders'?<><Header toast={toast}/><main><Placeholder title="订单" desc="订单列表、搜索、状态筛选和订单详情将在这里管理。"><button/></Placeholder></main></>:
  tab==='wallet'?<><Header toast={toast}/><main><Placeholder title="钱包" desc="余额、充值、提现、资金流水。"/></main></>:
  tab==='settlement'?<><Header toast={toast}/><main><Placeholder title="结算" desc="待结算、自动结算和历史结算。"/></main></>:
  <><Header toast={toast}/><main><Placeholder title="我的" desc="商户资料、安全设置、收款方式和 API 管理。"/></main></>
 return <div className="app">{page}<nav className="bottom">{[['home','⌂','首页'],['orders','▣','订单'],['wallet','▱','钱包'],['settlement','⇄','结算'],['me','♙','我的']].map(x=><button className={tab===x[0]?'active':''} onClick={()=>nav(x[0])} key={x[0]}><span>{x[1]}</span><b>{x[2]}</b></button>)}</nav>{toastMsg&&<div className="toast">{toastMsg}</div>}</div>
}
createRoot(document.getElementById('root')).render(<App/>)
