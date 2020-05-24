import BasicHeader from '../components/BasicHeader'
import BasicFooter from '../components/BasicFooter'
import BasicContent from '../components/BasicContent'

function renderHeader (h, props, view) {
  return h(
    BasicHeader,
    {
      props: {
        header: view.body.header
      }
    }
  )
}

function renderContent (h, props, view) {
  const { body } = view
  const { content } = body
  const { items } = content
  const renderItem = (items) => {
    return items.map((item) => {
      return h(
        item.type,
        {
          props: {
            ...item.props
          },
          slot: item.sot
        },
        item.children && renderItem(item.children)
      )
    })
  }
  return h(
    BasicContent,
    renderItem(items)
  )
}

function renderFooter (h, props, view, rootMeta) {
  console.log('footer', rootMeta.tabs)
  return h(
    BasicFooter,
    {
      props: {
        tabs: rootMeta.tabs.items
      }
    }
  )
}

function renderComponent (h, props, view, rootMeta) {
  return h(
    'div',
    {
      class: 'route-content'
    },
    [
      renderHeader(h, props, view),
      renderContent(h, props, view, rootMeta),
      renderFooter(h, props, view, rootMeta)
    ]
  )
}

export default renderComponent
