import AddToListButton from './AddToListButton'

const ActionButtons = ({ article }: { article: TArticle }) => {
  return (
    <ul className="flex justify-end">
      <li>
        <AddToListButton article={article} />
      </li>
    </ul>
  )
}

export default ActionButtons
