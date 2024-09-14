import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/global.css';


export const metadata = {
    title: "PromptHub",
    description: "Discover & Share AI prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <Provider>
        <main className='app'>
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
