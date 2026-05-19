function Footer({ companyName, email, note }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>{note}</p>
        <a href={`mailto:${email}`}>{email}</a>
        <small>
          © {new Date().getFullYear()} {companyName}
        </small>
      </div>
    </footer>
  )
}

export default Footer
