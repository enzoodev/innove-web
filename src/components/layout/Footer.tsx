import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from '@tabler/icons-react'

type Props = {
  type?: 'auth' | 'app'
}

export const Footer: React.FC<Props> = ({ type = 'app' }) => {
  const year = new Date().getFullYear()

  return (
    <footer
      className={`w-full flex flex-col gap-2 items-center justify-between sm:flex-row sm:gap-4 ${type === 'auth' ? 'p-4 border-t border-gray-300' : 'mt-6'}`}
    >
      <p className="text-gray-700 text-sm">
        {year} &copy; Innove. Todos os direitos reservados.
      </p>

      <ul className="flex flex-row items-center gap-2.5">
        <li className="text-gray-700 text-sm">Precisando de ajuda?</li>

        <li>
          <a
            href="https://api.whatsapp.com/send?phone=5547992251015&text=Ol%C3%A1%2C%20tenho%20d%C3%BAvidas%20sobre%20o%20Innove!%20%F0%9F%98%8A"
            target="_blank"
            rel="noopener noreferrer"
            title="Chame no WhatsApp"
          >
            <IconBrandWhatsapp stroke={1.5} className="text-gray-700" />
          </a>
        </li>

        <li>
          <a href="https://instagram-innove" title="Instagram">
            <IconBrandInstagram stroke={1.5} className="text-gray-700" />
          </a>
        </li>

        <li>
          <a
            href="mailto:meajuda@innove.com.br"
            title="E-mail: meajuda@innove.com.br"
          >
            <IconMail stroke={1.5} className="text-gray-700" />
          </a>
        </li>
      </ul>
    </footer>
  )
}
