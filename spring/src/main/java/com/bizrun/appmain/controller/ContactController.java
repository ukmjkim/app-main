package com.bizrun.appmain.controller;

import com.bizrun.appmain.exception.ResourceIllegalCopyException;
import com.bizrun.appmain.exception.ResourceNotFoundException;
import com.bizrun.appmain.model.Contact;
import com.bizrun.appmain.utils.DateUtils;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import com.bizrun.appmain.model.Customer;
import com.bizrun.appmain.repository.ContactRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ContactController {
    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/contacts")
    public List<Contact> getAllCustomers() {
        return contactRepository.findAll();
    }

    @GetMapping("/contacts/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable(value = "id") Long contactId)
            throws ResourceNotFoundException {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found for this id :: " + contactId));
        return ResponseEntity.ok().body(contact);
    }

    @PostMapping("/contacts")
    public Contact createCustomer(@Valid @RequestBody Contact contact) {
        contact.setCreatedDateTime(DateUtils.getCurrentUTCTime());
        return contactRepository.save(contact);
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable(value = "id") Long contactId,
                                                   @Valid @RequestBody Contact contactDetails) throws ResourceNotFoundException, ResourceIllegalCopyException {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found for this id :: " + contactId));

        try {
            BeanUtils.copyProperties(contact, contactDetails);
        } catch (IllegalAccessException e) {
            new ResourceIllegalCopyException("Error in BeanUtils.copyProperties(bag, bagDetails)");
        } catch (InvocationTargetException e) {
            new ResourceIllegalCopyException("Error in BeanUtils.copyProperties(bag, bagDetails)");
        }

        final Contact updatedContact = contactRepository.save(contact);
        return ResponseEntity.ok(updatedContact);
    }

    @DeleteMapping("/contacts/{id}")
    public Map<String, Boolean> deleteCustomer(@PathVariable(value = "id") Long contactId)
            throws ResourceNotFoundException {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found for this id :: " + contactId));

        contactRepository.delete(contact);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
