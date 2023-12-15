import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact  } from "../data/data";

export const loader = async ({
  params,
}) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action = async ({
  params,
  request,
}) => {
    invariant(params.contactId, "Missing contactId param");
    // console.log(request)
  
    const formData = await request.formData();
    //   console.log(formData)
    const updates = Object.fromEntries(formData);
    // const first = formData.get("first")
    // const last = formData.get("last")
    console.log(updates)
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
    const { contact } = useLoaderData<typeof loader>();
     const navigate = useNavigate();


  return (
    <Form id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          defaultValue={contact.first}
          aria-label="First name"
          name="firstOne"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          defaultValue={contact.notes}
          name="notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button"> 
        Cancel
        </button>
      </p>
    </Form>
  );
}


