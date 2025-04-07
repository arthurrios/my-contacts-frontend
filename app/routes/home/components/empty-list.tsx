import emptyBox from '../../../assets/images/empty-box.svg'

export function EmptyList() {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <img src={emptyBox} alt="Empty box" />

      <p className="text-gray-200 text-center">
        You don&apos;t have any contacts registered yet! Click the{' '}
        <strong className="text-primary-main">{`'New contact'`}</strong> button
        above to register your first one!
      </p>
    </div>
  )
}
