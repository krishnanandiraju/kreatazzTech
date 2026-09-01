function SectionTitle({ kicker, title, intro }) {
  return (
    <div className="section-title">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

export default SectionTitle
