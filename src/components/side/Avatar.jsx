import Placeholder from '../common/Placeholder.jsx'

export default function Avatar({ photo }) {
  return (
    <div className="av">
      {photo ? (
        <img src={photo} alt="Dheeraj T.P" width="88" height="88" />
      ) : (
        <div>
          DT
          <small>
            <Placeholder>photo soon</Placeholder>
          </small>
        </div>
      )}
    </div>
  )
}
